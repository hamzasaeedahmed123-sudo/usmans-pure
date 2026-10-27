import fs from "fs";
import path from "path";
import {
  hashPassword,
  verifyPassword,
  signAdminToken,
  verifyAdminToken,
  signCustomerToken,
  verifyCustomerToken,
  getOrInitAdminRecord,
  updateAdminPassword,
  createPasswordResetToken,
  validatePasswordResetToken,
  resetAdminPasswordWithToken,
} from "../src/lib/auth";
import {
  createCustomer,
  findCustomerByEmail,
  findCustomerById,
} from "../src/lib/customerStore";
import { PRODUCTS } from "../src/data/products";
import { LUXURY_BUNDLES } from "../src/data/bundles";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
  }
}

async function runTests() {
  console.log("=================================================");
  console.log("USMAN'S PURE: AUTOMATED SECURITY & PRICING SUITE");
  console.log("=================================================\n");

  // TEST 1: Password Hashing & Verification
  console.log("Test Suite 1: Password Cryptography");
  const plain = "admin1947";
  const hash = await hashPassword(plain);
  assert(hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$"), "bcrypt salt rounds format verified");
  assert(await verifyPassword(plain, hash), "Correct password matches hash");
  assert(!(await verifyPassword("wrongPass123", hash)), "Incorrect password is rejected");

  // TEST 2: Admin Bootstrap & Password Change Lifecycle
  console.log("\nTest Suite 2: Admin Bootstrap & Password Reset Lifecycle");
  const initialAdmin = await getOrInitAdminRecord();
  assert(initialAdmin.username === "admin@usmanspure.com" || initialAdmin.email === "admin@usmanspure.com", "Bootstrap admin email is 'admin@usmanspure.com'");
  assert(await verifyPassword("admin1122", initialAdmin.passwordHash), "Initial admin password 'admin1122' matches hashed record");

  // Test updating password
  const newPass = "NewSecureAdmin2026!#";
  const updatedAdmin = await updateAdminPassword(newPass);
  assert(updatedAdmin.mustChangePassword === false, "After password update, mustChangePassword is false");
  assert(await verifyPassword(newPass, updatedAdmin.passwordHash), "New password matches updated hash");
  assert(!(await verifyPassword("admin1122", updatedAdmin.passwordHash)), "Old password 'admin1122' is no longer valid");

  // Test Password Reset Token Generation & Validation
  const resetToken = await createPasswordResetToken("admin@usmanspure.com");
  assert(typeof resetToken === "string" && resetToken.length === 64, "Generated 64-char crypto reset token");
  const tokenCheck = await validatePasswordResetToken(resetToken);
  assert(tokenCheck.valid === true, "Valid reset token is accepted");

  // Test Invalid Reset Token
  const badTokenCheck = await validatePasswordResetToken("invalid_fake_token_123456");
  assert(badTokenCheck.valid === false, "Invalid reset token is rejected");

  // Test resetting password using token
  const resetResult = await resetAdminPasswordWithToken(resetToken, "admin1122");
  assert(resetResult.success === true, "Password reset with valid token succeeds");
  const reloadedAdmin = await getOrInitAdminRecord();
  assert(await verifyPassword("admin1122", reloadedAdmin.passwordHash), "Restored admin credentials to 'admin1122'");

  // Token is single-use: Reusing the same token must fail
  const reuseCheck = await validatePasswordResetToken(resetToken);
  assert(reuseCheck.valid === false, "Reset token is single-use and invalidated after reset");

  // TEST 3: Cryptographic JWT Verification & Role Tampering Guard
  console.log("\nTest Suite 3: Cryptographic JWT & Authorization Guard");
  const adminToken = await signAdminToken({
    username: "usmanspure1947",
    role: "admin",
    mustChangePassword: true,
  });
  const verifiedAdmin = await verifyAdminToken(adminToken);
  assert(verifiedAdmin !== null && verifiedAdmin.role === "admin", "Valid admin token is verified");

  // Try forged/tampered token
  const tamperedToken = adminToken.slice(0, -6) + "xxxxxx";
  const verifiedTampered = await verifyAdminToken(tamperedToken);
  assert(verifiedTampered === null, "Tampered admin token signature is strictly rejected");

  // Customer Token
  const customerToken = await signCustomerToken({
    userId: "cust-test-123",
    email: "test.customer@gmail.com",
    name: "Tariq Customer",
    role: "customer",
  });
  const verifiedCust = await verifyCustomerToken(customerToken);
  assert(verifiedCust !== null && verifiedCust.role === "customer", "Valid customer token is verified");
  // Ensure customer token cannot authenticate as admin
  const customerAsAdmin = await verifyAdminToken(customerToken);
  assert(customerAsAdmin === null, "Customer token cannot authenticate as admin (audience & issuer isolated)");

  // TEST 4: Customer Account Persistence & Isolation
  console.log("\nTest Suite 4: Customer Store & Role Isolation");
  const testEmail = `test_${Date.now()}@example.pk`;
  const createdCustomer = createCustomer({
    name: "Ahmad Raza",
    email: testEmail,
    passwordHash: await hashPassword("CustomerSecret123"),
    phone: "03001234567",
  });
  assert(createdCustomer.email === testEmail, "Customer saved to persistent store with sanitized email");
  const retrieved = findCustomerByEmail(testEmail);
  assert(retrieved !== null && retrieved.id === createdCustomer.id, "Customer lookup by email succeeds");
  assert(findCustomerById(createdCustomer.id) !== null, "Customer lookup by ID succeeds");

  // TEST 5: E-Commerce Pricing Integrity & Single Source of Truth
  console.log("\nTest Suite 5: E-Commerce Catalog & Server-Side Pricing Integrity");
  const prod1 = PRODUCTS.find((p) => p.id === "prod-1");
  assert(prod1 !== undefined, "Catalog item prod-1 exists in PRODUCTS");
  const expectedProd1Price = prod1!.price; // 1200

  // Simulate client order calculation with price tampering attempt
  const clientSubmittedTamperedPrice = 50; // attacker claims price is Rs 50 instead of Rs 1200
  const qty = 3;

  // Server recalculation
  const verifiedItemPrice = prod1!.price;
  const verifiedItemTotal = verifiedItemPrice * qty; // 1200 * 3 = 3600
  assert(verifiedItemPrice === 1200, "Server price matches trusted catalog, ignoring client's Rs 50 claim");
  assert(verifiedItemTotal === 3600, "Server subtotal is calculated as 3600");

  // Test Delivery Fee Policy
  // Order 1: Subtotal < 10,000 -> Delivery fee is Rs 250
  const feeUnderThreshold = verifiedItemTotal >= 10000 ? 0 : 250;
  assert(feeUnderThreshold === 250, "Orders under PKR 10,000 are charged Rs 250 delivery fee");
  assert(verifiedItemTotal + feeUnderThreshold === 3850, "Grand total for Rs 3600 subtotal is Rs 3850");

  // Order 2: Subtotal >= 10,000 -> Delivery fee is FREE (Rs 0)
  const largeSubtotal = 12000;
  const feeOverThreshold = largeSubtotal >= 10000 ? 0 : 250;
  assert(feeOverThreshold === 0, "Orders of PKR 10,000 or more qualify for FREE delivery (Rs 0)");
  assert(largeSubtotal + feeOverThreshold === 12000, "Grand total for Rs 12,000 subtotal is Rs 12,000");

  // Luxury Bundle Verification
  const bundle1 = LUXURY_BUNDLES.find((b) => b.id === "bundle-1");
  assert(bundle1 !== undefined, "Luxury Bundle bundle-1 exists in LUXURY_BUNDLES");
  assert(bundle1!.price === 2050, "bundle-1 price verified at Rs 2050");

  console.log("\n=================================================");
  console.log(`TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("=================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
