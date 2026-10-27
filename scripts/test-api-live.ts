const BASE_URL = "http://localhost:3000";

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

async function runLiveTests() {
  console.log("=================================================");
  console.log("USMAN'S PURE: LIVE API & ENDPOINT INTEGRITY SUITE");
  console.log("=================================================\n");

  // TEST 1: Admin Login with Initial Bootstrap Credentials
  console.log("Test 1: Admin Bootstrap Authentication");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "usmanspure1947",
      password: "admin1947",
    }),
  });
  const loginData = await loginRes.json();
  const setCookie = loginRes.headers.get("set-cookie") || "";

  assert(loginRes.status === 200, "POST /api/admin/login returned status 200");
  assert(loginData.success === true, "Admin login response success is true");
  assert(loginData.role === "admin", "Authenticated role is 'admin'");
  assert(loginData.mustChangePassword === true, "mustChangePassword flag is true on initial bootstrap");
  assert(setCookie.includes("admin_token="), "Set-Cookie header contains secure 'admin_token'");
  assert(setCookie.includes("HttpOnly"), "'admin_token' cookie has HttpOnly flag");

  // Extract admin cookie
  const cookieMatch = setCookie.match(/admin_token=([^;,\s]+)/);
  const adminCookie = cookieMatch ? `admin_token=${cookieMatch[1]}` : "";

  // TEST 2: Admin Login with Wrong Password (Rate limit & rejection check)
  console.log("\nTest 2: Rejection of Invalid Credentials");
  const badLoginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "usmanspure1947",
      password: "wrongPassword999",
    }),
  });
  assert(badLoginRes.status === 401, "Invalid password rejected with HTTP 401");

  // TEST 3: Admin Protected Session Check
  console.log("\nTest 3: Protected Admin Session Verification");
  const meRes = await fetch(`${BASE_URL}/api/admin/me`, {
    headers: { Cookie: adminCookie },
  });
  const meData = await meRes.json();
  assert(meRes.status === 200, "GET /api/admin/me with valid cookie returns 200");
  assert(meData.authenticated === true, "Admin session verified as authenticated");
  assert(meData.username === "usmanspure1947", "Session belongs to usmanspure1947");

  // Test accessing without cookie
  const unauthRes = await fetch(`${BASE_URL}/api/admin/me`);
  assert(unauthRes.status === 401, "GET /api/admin/me without cookie is strictly rejected with 401");

  // TEST 4: E-Commerce Pricing & Tampering Integrity
  console.log("\nTest 4: Checkout & Order Pricing Integrity");
  // Client attempts to tamper with prices: claims prod-1 is Rs 10 and subtotal is Rs 20
  const orderPayload = {
    customerName: "Mohammad Ali",
    phone: "03008765432",
    address: "House 12, Street 4, Model Town",
    city: "Lahore",
    items: [
      { id: "prod-1", quantity: 2, pack: "standard" }, // True price is Rs 1,200 each -> Rs 2,400
    ],
    // Attacker sends manipulated prices:
    subtotal: 20,
    shippingFee: 0,
    totalAmount: 20,
    paymentMethod: "Cash on Delivery (COD)",
  };

  const orderRes = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });
  const orderData = await orderRes.json();

  assert(orderRes.status === 200, "POST /api/orders returned 200");
  assert(orderData.success === true, "Order successfully persisted");
  assert(orderData.order !== undefined, "Order object returned by server");
  assert(orderData.order.subtotal === 2400, "Server calculated subtotal strictly as Rs 2,400 (ignoring client's Rs 20)");
  assert(orderData.order.shippingFee === 250, "Server applied flat Rs 250 delivery fee (subtotal < 10,000)");
  assert(orderData.order.grandTotal === 2650, "Server calculated grand total strictly as Rs 2,650 (Rs 2,400 + Rs 250)");

  // TEST 5: Free Delivery Policy Verification
  console.log("\nTest 5: Free Delivery Verification (Orders >= Rs 10,000)");
  const largeOrderPayload = {
    customerName: "Mohammad Ali",
    phone: "03008765432",
    address: "House 12, Street 4, Model Town",
    city: "Lahore",
    items: [
      { id: "prod-1", quantity: 9, pack: "standard" }, // 9 * 1200 = 10,800
    ],
    paymentMethod: "Cash on Delivery (COD)",
  };

  const largeOrderRes = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(largeOrderPayload),
  });
  const largeOrderData = await largeOrderRes.json();
  assert(largeOrderData.order.subtotal === 10800, "Subtotal calculated as Rs 10,800");
  assert(largeOrderData.order.shippingFee === 0, "Orders >= Rs 10,000 qualify for Rs 0 Free Delivery");
  assert(largeOrderData.order.grandTotal === 10800, "Grand total matches subtotal with zero delivery fee");

  // TEST 6: Order Validation Guards (Invalid Product / Incomplete Details)
  console.log("\nTest 6: Order Validation & Attack Vector Rejection");
  const badProductOrder = {
    customerName: "Attacker",
    phone: "03001112233",
    address: "Unknown Address",
    city: "Karachi",
    items: [{ id: "fake-non-existent-product", quantity: 1 }],
  };
  const badProductRes = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(badProductOrder),
  });
  assert(badProductRes.status === 400, "Order with fabricated product ID is rejected with HTTP 400");

  const incompleteOrder = {
    customerName: "",
    phone: "123",
    items: [],
  };
  const incompleteRes = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incompleteOrder),
  });
  assert(incompleteRes.status === 400, "Incomplete order payload rejected with HTTP 400");

  // TEST 7: Customer Registration & Login Lifecycle
  console.log("\nTest 7: Customer Registration & Session Lifecycle");
  const testCustomerEmail = `live_cust_${Date.now()}@test.pk`;
  const custRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Fatima Noor",
      email: testCustomerEmail,
      password: "StrongPassword123!",
      phone: "03219876543",
      role: "admin", // Attacker trying role promotion
    }),
  });
  const custRegData = await custRegRes.json();
  assert(custRegRes.status === 200, "Customer registration returns 200");
  assert(custRegData.user.role === "customer", "Server enforces role 'customer', ignoring client's 'admin' role promotion attempt");

  // Customer Login
  const custLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testCustomerEmail,
      password: "StrongPassword123!",
    }),
  });
  const custLoginData = await custLoginRes.json();
  const custSetCookie = custLoginRes.headers.get("set-cookie") || "";
  assert(custLoginRes.status === 200, "Customer login returns 200");
  assert(custLoginData.user.email === testCustomerEmail, "Customer email verified");
  assert(custSetCookie.includes("customer_token="), "Customer session token issued in HttpOnly cookie");

  console.log("\n=================================================");
  console.log(`LIVE SUITE COMPLETED: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("=================================================");

  if (failedCount > 0) process.exit(1);
}

runLiveTests().catch((e) => {
  console.error("Live test suite crashed:", e);
  process.exit(1);
});
