import fs from "fs";
import path from "path";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const ADMIN_PIN = process.env.ADMIN_PIN || "treqo2026";

const results = [];

function recordTest(id, title, category, severity, passed, details, rootCause = "", recommendedFix = "") {
  const result = {
    id,
    title,
    category,
    severity,
    passed,
    details,
    rootCause,
    recommendedFix,
    status: passed ? "PASS" : "FAIL",
  };
  results.push(result);
  console.log(`[${passed ? "PASS" : "FAIL"}] [${severity}] ${id}: ${title} - ${details}`);
}

async function runTestSuite() {
  console.log("=================================================");
  console.log("TREQO COMPREHENSIVE END-TO-END QA & SECURITY TEST");
  console.log(`Target: ${BASE_URL} | Time: ${new Date().toISOString()}`);
  console.log("=================================================\n");

  // -----------------------------------------------------------------
  // 1. FRONTEND ROUTE TESTS
  // -----------------------------------------------------------------
  console.log("--- 1. Testing Public Frontend Routes ---");
  const publicRoutes = [
    { path: "/", expectedStatus: 200, name: "Home Page" },
    { path: "/blog", expectedStatus: 200, name: "Blog Listing" },
    { path: "/courses", expectedStatus: 200, name: "Courses Listing" },
    { path: "/programs", expectedStatus: 200, name: "Programs Listing" },
    { path: "/privacy", expectedStatus: 200, name: "Privacy Page" },
    { path: "/terms", expectedStatus: 200, name: "Terms Page" },
    { path: "/privacy-policy", expectedStatus: 200, name: "Privacy Policy Alias" },
    { path: "/terms-and-conditions", expectedStatus: 200, name: "Terms & Conditions Alias" },
    { path: "/robots.txt", expectedStatus: 200, name: "Robots.txt" },
    { path: "/sitemap.xml", expectedStatus: 200, name: "Sitemap XML" },
    { path: "/admin", expectedStatus: 200, name: "Admin Entrypoint" },
    { path: "/admin/programs", expectedStatus: 200, name: "Admin Programs Management" },
    { path: "/admin/leads", expectedStatus: 200, name: "Admin Leads Management" },
    { path: "/courses/new-age-digital-marketing-online", expectedStatus: 200, name: "Flagship Course Page" },
    { path: "/random-invalid-route-should-404-xyz", expectedStatus: 404, name: "404 Not Found Page" },
  ];

  for (let i = 0; i < publicRoutes.length; i++) {
    const route = publicRoutes[i];
    try {
      const res = await fetch(`${BASE_URL}${route.path}`, { redirect: "manual" });
      const pass = res.status === route.expectedStatus || (route.expectedStatus === 200 && res.status < 400);
      recordTest(
        `ROUTE-${String(i + 1).padStart(3, "0")}`,
        `Route ${route.path} (${route.name}) returns HTTP ${route.expectedStatus}`,
        "Frontend Routing",
        route.expectedStatus === 404 ? "Low" : "High",
        pass,
        `HTTP ${res.status} (expected ${route.expectedStatus})`
      );
    } catch (err) {
      recordTest(
        `ROUTE-${String(i + 1).padStart(3, "0")}`,
        `Route ${route.path} (${route.name}) unreachable`,
        "Frontend Routing",
        "Critical",
        false,
        err.message,
        "Network connection or server error",
        "Verify dev server is active on port 3000"
      );
    }
  }

  // -----------------------------------------------------------------
  // 2. AUTHENTICATION & AUTHORIZATION API TESTS
  // -----------------------------------------------------------------
  console.log("\n--- 2. Testing Authentication & Authorization APIs ---");

  // POST /api/admin/auth
  try {
    const resEmpty = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    recordTest(
      "AUTH-001",
      "POST /api/admin/auth rejects empty passcode with 400",
      "Authentication",
      "High",
      resEmpty.status === 400,
      `Status: ${resEmpty.status}`
    );

    const resWrong = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: "wrongpasscode123" }),
    });
    recordTest(
      "AUTH-002",
      "POST /api/admin/auth rejects incorrect passcode with 401",
      "Authentication",
      "High",
      resWrong.status === 401,
      `Status: ${resWrong.status}`
    );

    const resValid = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: ADMIN_PIN }),
    });
    const validData = await resValid.json().catch(() => ({}));
    recordTest(
      "AUTH-003",
      "POST /api/admin/auth accepts valid passcode with 200 and success flag",
      "Authentication",
      "High",
      resValid.status === 200 && validData.success === true,
      `Status: ${resValid.status}, success: ${validData.success}`
    );

    // NoSQL injection in PIN
    const resNoSql = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: { $ne: null } }),
    });
    recordTest(
      "AUTH-004",
      "POST /api/admin/auth rejects NoSQL object payload for PIN",
      "Security",
      "Critical",
      resNoSql.status === 400 || resNoSql.status === 401,
      `Status: ${resNoSql.status}`
    );
  } catch (err) {
    recordTest("AUTH-ERR", "Auth API suite failure", "Authentication", "Critical", false, err.message);
  }

  // Check endpoint authorization on protected routes without credentials
  const protectedEndpoints = [
    { method: "GET", url: "/api/admin/content", id: "AUTH-005", name: "Admin Content" },
    { method: "POST", url: "/api/admin/content", id: "AUTH-006", name: "Admin Content Save" },
    { method: "GET", url: "/api/admin/status", id: "AUTH-007", name: "Admin DB Status" },
    { method: "POST", url: "/api/admin/blogs", id: "AUTH-008", name: "Admin Blog Save" },
    { method: "DELETE", url: "/api/admin/blogs?slug=test", id: "AUTH-009", name: "Admin Blog Delete" },
    { method: "POST", url: "/api/admin/upload", id: "AUTH-010", name: "Admin Upload File" },
    { method: "GET", url: "/api/admin/upload", id: "AUTH-011", name: "Admin Upload List (no ?id)" },
    { method: "DELETE", url: "/api/admin/upload?id=fake", id: "AUTH-012", name: "Admin Upload Delete" },
    { method: "GET", url: "/api/leads", id: "AUTH-013", name: "CRM Leads List" },
    { method: "DELETE", url: "/api/leads?id=fake", id: "AUTH-014", name: "CRM Lead Delete" },
    { method: "POST", url: "/api/programs", id: "AUTH-015", name: "Create Program" },
    { method: "PATCH", url: "/api/programs/test-id", id: "AUTH-016", name: "Update Program" },
    { method: "DELETE", url: "/api/programs/test-id", id: "AUTH-017", name: "Delete Program" },
    { method: "POST", url: "/api/admin/ai", id: "AUTH-018", name: "Admin AI Assistant" },
    { method: "POST", url: "/api/admin/test-alert", id: "AUTH-019", name: "Admin Test Alert" },
  ];

  for (const ep of protectedEndpoints) {
    try {
      const res = await fetch(`${BASE_URL}${ep.url}`, {
        method: ep.method,
        headers: { "Content-Type": "application/json" },
        body: ["POST", "PATCH"].includes(ep.method) ? JSON.stringify({ test: "data" }) : undefined,
      });
      const passed = res.status === 401;
      recordTest(
        ep.id,
        `${ep.method} ${ep.url} rejects unauthenticated requests with 401`,
        "Authorization",
        "Critical",
        passed,
        `Status: ${res.status} (expected 401)`,
        passed ? "" : "Endpoint missing authorization guard",
        passed ? "" : "Add isAuthorizedRequest check at handler start"
      );
    } catch (err) {
      recordTest(ep.id, `${ep.method} ${ep.url} error`, "Authorization", "Critical", false, err.message);
    }
  }

  // -----------------------------------------------------------------
  // 3. PUBLIC API ENDPOINTS
  // -----------------------------------------------------------------
  console.log("\n--- 3. Testing Public API Endpoints ---");

  // GET /api/courses
  try {
    const res = await fetch(`${BASE_URL}/api/courses`);
    const data = await res.json().catch(() => ({}));
    recordTest(
      "API-PUB-001",
      "GET /api/courses returns 200 with courses array",
      "Public APIs",
      "High",
      res.status === 200 && Array.isArray(data.courses) && data.courses.length > 0,
      `Status: ${res.status}, Count: ${data.courses ? data.courses.length : 0}`
    );
  } catch (err) {
    recordTest("API-PUB-001", "GET /api/courses failed", "Public APIs", "High", false, err.message);
  }

  // GET /api/forms
  try {
    const res = await fetch(`${BASE_URL}/api/forms`);
    const data = await res.json().catch(() => ({}));
    recordTest(
      "API-PUB-002",
      "GET /api/forms returns 200 with forms settings",
      "Public APIs",
      "Medium",
      res.status === 200 && data.success === true,
      `Status: ${res.status}`
    );
  } catch (err) {
    recordTest("API-PUB-002", "GET /api/forms failed", "Public APIs", "Medium", false, err.message);
  }

  // GET /api/admin/blogs (Public reading of blogs)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/blogs`);
    const data = await res.json().catch(() => ({}));
    recordTest(
      "API-PUB-003",
      "GET /api/admin/blogs returns 200 with blogs array",
      "Public APIs",
      "Medium",
      res.status === 200 && data.success === true && Array.isArray(data.blogs),
      `Status: ${res.status}, Blogs: ${data.blogs ? data.blogs.length : 0}`
    );
  } catch (err) {
    recordTest("API-PUB-003", "GET /api/admin/blogs failed", "Public APIs", "Medium", false, err.message);
  }

  // GET /api/programs (Public reading of programs with filters)
  try {
    const resAll = await fetch(`${BASE_URL}/api/programs`);
    const dataAll = await resAll.json().catch(() => ({}));
    recordTest(
      "API-PUB-004",
      "GET /api/programs returns 200 with programs list",
      "Public APIs",
      "High",
      resAll.status === 200 && dataAll.success === true && Array.isArray(dataAll.programs),
      `Count: ${dataAll.count}`
    );

    const resLive = await fetch(`${BASE_URL}/api/programs?status=live`);
    const dataLive = await resLive.json().catch(() => ({}));
    const allLive = (dataLive.programs || []).every((p) => !p.isLocked);
    recordTest(
      "API-PUB-005",
      "GET /api/programs?status=live correctly filters unlocked programs",
      "Public APIs",
      "Medium",
      resLive.status === 200 && allLive,
      `Live Count: ${dataLive.count}`
    );

    const resSearch = await fetch(`${BASE_URL}/api/programs?search=digital`);
    const dataSearch = await resSearch.json().catch(() => ({}));
    recordTest(
      "API-PUB-006",
      "GET /api/programs?search=digital matches relevant programs",
      "Public APIs",
      "Medium",
      resSearch.status === 200 && (dataSearch.count || 0) >= 1,
      `Matched: ${dataSearch.count}`
    );
  } catch (err) {
    recordTest("API-PUB-004", "GET /api/programs suite failed", "Public APIs", "High", false, err.message);
  }

  // -----------------------------------------------------------------
  // 4. STUDENT LEAD APPLICATION (POST /api/apply)
  // -----------------------------------------------------------------
  console.log("\n--- 4. Testing Student Application & Form Validation ---");

  // Invalid payloads
  try {
    const resEmpty = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    recordTest(
      "FORM-001",
      "POST /api/apply rejects empty body with 400 Bad Request",
      "Validation",
      "High",
      resEmpty.status === 400,
      `Status: ${resEmpty.status}`
    );

    const resShortName = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A", email: "student@example.com", phone: "+91 9876543210" }),
    });
    recordTest(
      "FORM-002",
      "POST /api/apply rejects 1-character name with 400",
      "Validation",
      "Medium",
      resShortName.status === 400,
      `Status: ${resShortName.status}`
    );

    const resInvalidEmail = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Valid Student", email: "not-an-email", phone: "+91 9876543210" }),
    });
    recordTest(
      "FORM-003",
      "POST /api/apply rejects invalid email format with 400",
      "Validation",
      "Medium",
      resInvalidEmail.status === 400,
      `Status: ${resInvalidEmail.status}`
    );

    const resInvalidPhone = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Valid Student", email: "student@example.com", phone: "123" }),
    });
    recordTest(
      "FORM-004",
      "POST /api/apply rejects short phone number (<7 digits) with 400",
      "Validation",
      "Medium",
      resInvalidPhone.status === 400,
      `Status: ${resInvalidPhone.status}`
    );

    // Valid student application
    const uniqueStudentEmail = `qa.student.${Date.now()}@example.com`;
    const resValidLead = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "QA Automated Applicant",
        email: uniqueStudentEmail,
        phone: "+91 9876543210",
        course: "New Age Digital Marketing",
        background: "Undergraduate Student",
        source: "Automated QA Test",
        page: "/courses/new-age-digital-marketing-online",
      }),
    });
    const validLeadData = await resValidLead.json().catch(() => ({}));
    recordTest(
      "FORM-005",
      "POST /api/apply records valid lead and returns 200 with lead data",
      "Business Logic",
      "High",
      resValidLead.status === 200 && validLeadData.success === true && !!validLeadData.lead?.id,
      `Status: ${resValidLead.status}, Lead ID: ${validLeadData.lead?.id}`
    );

    // Verify lead shows up in CRM /api/leads with admin auth
    const resLeadsCheck = await fetch(`${BASE_URL}/api/leads?q=${encodeURIComponent(uniqueStudentEmail)}`, {
      headers: { "x-admin-pin": ADMIN_PIN },
    });
    const leadsData = await resLeadsCheck.json().catch(() => ({}));
    const leadFound = (leadsData.leads || []).some((l) => l.email === uniqueStudentEmail);
    recordTest(
      "FORM-006",
      "Submitted lead immediately appears in authorized CRM query",
      "Data Integrity",
      "High",
      resLeadsCheck.status === 200 && leadFound,
      `Lead found in query: ${leadFound}`
    );

    // Clean up created test lead
    if (validLeadData.lead?.id) {
      const resDelLead = await fetch(`${BASE_URL}/api/leads?id=${encodeURIComponent(validLeadData.lead.id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": ADMIN_PIN },
      });
      recordTest(
        "FORM-007",
        "DELETE /api/leads?id= successfully deletes test lead",
        "Data Deletion",
        "Medium",
        resDelLead.status === 200,
        `Status: ${resDelLead.status}`
      );
    }

    // CSV injection in Lead fields
    const resCsvInj = await fetch(`${BASE_URL}/api/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "=cmd|' /C calc'!A0",
        email: `qa.csv.${Date.now()}@example.com`,
        phone: "+91 9999988888",
        course: "@SUM(1+1)",
      }),
    });
    const csvInjData = await resCsvInj.json().catch(() => ({}));
    // Check CSV export handles formula characters safely
    const resCsvExport = await fetch(`${BASE_URL}/api/leads?format=csv`, {
      headers: { "x-admin-pin": ADMIN_PIN },
    });
    const csvText = await resCsvExport.text();
    // Neutralized cells must prefix with single quote `'=` or safe quotes
    const isFormulaEscaped = csvText.includes("''=cmd") || csvText.includes("'=cmd") || !csvText.includes("=cmd|' /C calc");
    recordTest(
      "SEC-CSV-001",
      "CSV formula injection defense on lead export",
      "Security",
      "High",
      isFormulaEscaped,
      `Formula neutralized: ${isFormulaEscaped}`
    );

    if (csvInjData.lead?.id) {
      await fetch(`${BASE_URL}/api/leads?id=${encodeURIComponent(csvInjData.lead.id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": ADMIN_PIN },
      });
    }
  } catch (err) {
    recordTest("FORM-ERR", "Form validation suite failed", "Validation", "High", false, err.message);
  }

  // -----------------------------------------------------------------
  // 5. PROGRAM / COURSE CRUD LIFECYCLE
  // -----------------------------------------------------------------
  console.log("\n--- 5. Testing Program / Course CRUD Lifecycle ---");

  const testProgramId = `qa-test-program-${Date.now()}`;
  try {
    // CREATE
    const resCreate = await fetch(`${BASE_URL}/api/programs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": ADMIN_PIN,
      },
      body: JSON.stringify({
        id: testProgramId,
        title: "QA Test Specialized Automation Track",
        description: "An intensive end-to-end testing track for quality assurance.",
        badge: "QA Specialist",
        badgeVariant: "blue",
        duration: "3 months · Online",
        actionText: "Apply Now →",
        actionHref: `/programs/${testProgramId}`,
        previewLabel: "QA TEST TRACK",
        isLocked: false,
        tags: ["QA", "Testing"],
      }),
    });
    const createData = await resCreate.json().catch(() => ({}));
    recordTest(
      "CRUD-001",
      "POST /api/programs creates new program with 201 Created",
      "Admin CRUD",
      "High",
      resCreate.status === 201 && createData.success === true,
      `Status: ${resCreate.status}`
    );

    // DUPLICATE REJECTION (409 Conflict)
    const resDup = await fetch(`${BASE_URL}/api/programs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": ADMIN_PIN,
      },
      body: JSON.stringify({
        id: testProgramId,
        title: "Duplicate QA Track",
        description: "Duplicate",
        badge: "Test",
        actionHref: "/test",
      }),
    });
    recordTest(
      "CRUD-002",
      "POST /api/programs rejects duplicate ID with 409 Conflict",
      "Admin CRUD",
      "Medium",
      resDup.status === 409,
      `Status: ${resDup.status}`
    );

    // READ BY ID
    const resGet = await fetch(`${BASE_URL}/api/programs/${testProgramId}`);
    const getData = await resGet.json().catch(() => ({}));
    recordTest(
      "CRUD-003",
      "GET /api/programs/[id] retrieves newly created program",
      "Admin CRUD",
      "High",
      resGet.status === 200 && getData.program?.id === testProgramId,
      `Found program title: ${getData.program?.title}`
    );

    // UPDATE / PATCH
    const resPatch = await fetch(`${BASE_URL}/api/programs/${testProgramId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": ADMIN_PIN,
      },
      body: JSON.stringify({
        title: "QA Test Specialized Automation Track (UPDATED)",
        isLocked: true,
        badgeVariant: "amber",
      }),
    });
    const patchData = await resPatch.json().catch(() => ({}));
    recordTest(
      "CRUD-004",
      "PATCH /api/programs/[id] updates title, lock status, and badge variant",
      "Admin CRUD",
      "High",
      resPatch.status === 200 &&
        patchData.program?.title?.includes("UPDATED") &&
        patchData.program?.isLocked === true &&
        patchData.program?.badgeVariant === "amber",
      `Status: ${resPatch.status}, Locked: ${patchData.program?.isLocked}`
    );

    // DELETE
    const resDel = await fetch(`${BASE_URL}/api/programs/${testProgramId}`, {
      method: "DELETE",
      headers: {
        "x-admin-pin": ADMIN_PIN,
      },
    });
    recordTest(
      "CRUD-005",
      "DELETE /api/programs/[id] removes program with 200 OK",
      "Admin CRUD",
      "High",
      resDel.status === 200,
      `Status: ${resDel.status}`
    );

    // VERIFY 404 AFTER DELETION
    const resCheckGone = await fetch(`${BASE_URL}/api/programs/${testProgramId}`);
    recordTest(
      "CRUD-006",
      "GET /api/programs/[id] returns 404 for deleted program",
      "Data Integrity",
      "High",
      resCheckGone.status === 404,
      `Status: ${resCheckGone.status}`
    );
  } catch (err) {
    recordTest("CRUD-ERR", "Program CRUD suite failed", "Admin CRUD", "High", false, err.message);
  }

  // -----------------------------------------------------------------
  // 6. FILE UPLOAD & STORAGE SECURITY
  // -----------------------------------------------------------------
  console.log("\n--- 6. Testing File Upload & Storage Security ---");

  try {
    // 1. Upload valid 1x1 PNG image
    const validPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const pngBuffer = Buffer.from(validPngBase64, "base64");
    const formData = new FormData();
    const blob = new Blob([pngBuffer], { type: "image/png" });
    formData.append("file", blob, "qa-test-dot.png");
    formData.append("folder", "qa-test");

    const resUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: {
        "x-admin-pin": ADMIN_PIN,
      },
      body: formData,
    });
    const uploadData = await resUpload.json().catch(() => ({}));
    recordTest(
      "UPL-001",
      "POST /api/admin/upload accepts valid PNG and returns public URL",
      "Image Storage",
      "High",
      resUpload.status === 200 && uploadData.success === true && !!uploadData.url,
      `Status: ${resUpload.status}, URL: ${uploadData.url}`
    );

    // Verify uploaded image is downloadable via GET
    if (uploadData.url) {
      const imgFetchUrl = uploadData.url.startsWith("http") ? uploadData.url : `${BASE_URL}${uploadData.url}`;
      const resImgGet = await fetch(imgFetchUrl);
      recordTest(
        "UPL-002",
        "Uploaded image is publicly retrievable with correct image Content-Type",
        "Image Storage",
        "High",
        resImgGet.status === 200 && resImgGet.headers.get("content-type")?.includes("image"),
        `Status: ${resImgGet.status}, Content-Type: ${resImgGet.headers.get("content-type")}`
      );

      // Clean up uploaded image
      const delUrl = uploadData.url.startsWith("/api/admin/upload?id=")
        ? `${BASE_URL}/api/admin/upload?id=${encodeURIComponent(uploadData.url.split("id=")[1])}`
        : `${BASE_URL}/api/admin/upload?path=${encodeURIComponent(uploadData.url.replace(/^\//, ""))}`;
      await fetch(delUrl, {
        method: "DELETE",
        headers: { "x-admin-pin": ADMIN_PIN },
      });
    }

    // 2. Reject dangerous file extensions (.php / .js / .exe)
    const dangerousFormData = new FormData();
    const dangerousBlob = new Blob([Buffer.from("console.log('malicious');")], { type: "application/javascript" });
    dangerousFormData.append("file", dangerousBlob, "exploit.js");
    dangerousFormData.append("folder", "general");

    const resDang = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: { "x-admin-pin": ADMIN_PIN },
      body: dangerousFormData,
    });
    recordTest(
      "UPL-003",
      "POST /api/admin/upload rejects non-image extension (.js) with 400",
      "Image Security",
      "Critical",
      resDang.status === 400,
      `Status: ${resDang.status}`
    );

    // 3. MIME spoofing test: file named evil.php with image/png Content-Type
    const spoofFormData = new FormData();
    const spoofBlob = new Blob([Buffer.from("<?php phpinfo(); ?>")], { type: "image/png" });
    spoofFormData.append("file", spoofBlob, "evil.php");
    spoofFormData.append("folder", "general");

    const resSpoof = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: { "x-admin-pin": ADMIN_PIN },
      body: spoofFormData,
    });
    recordTest(
      "UPL-004",
      "POST /api/admin/upload rejects PHP file with spoofed image/png MIME type",
      "Image Security",
      "Critical",
      resSpoof.status === 400,
      `Status: ${resSpoof.status} (expected 400 rejection)`
    );

    // 4. Double extension test: evil.php.png
    const doubleExtFormData = new FormData();
    const doubleBlob = new Blob([pngBuffer], { type: "image/png" });
    doubleExtFormData.append("file", doubleBlob, "evil.php.png");
    doubleExtFormData.append("folder", "general");

    const resDouble = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: { "x-admin-pin": ADMIN_PIN },
      body: doubleExtFormData,
    });
    const doubleData = await resDouble.json().catch(() => ({}));
    // Should either reject or sanitize filename so .php is not executable
    const safeDouble = resDouble.status === 400 || (doubleData.url && !doubleData.url.endsWith(".php"));
    recordTest(
      "UPL-005",
      "POST /api/admin/upload prevents double-extension execution risk",
      "Image Security",
      "High",
      safeDouble,
      `Status: ${resDouble.status}, URL: ${doubleData.url}`
    );

    if (doubleData.url) {
      const delUrl = doubleData.url.startsWith("/api/admin/upload?id=")
        ? `${BASE_URL}/api/admin/upload?id=${encodeURIComponent(doubleData.url.split("id=")[1])}`
        : `${BASE_URL}/api/admin/upload?path=${encodeURIComponent(doubleData.url.replace(/^\//, ""))}`;
      await fetch(delUrl, {
        method: "DELETE",
        headers: { "x-admin-pin": ADMIN_PIN },
      });
    }

    // 5. Directory Traversal in folder parameter
    const travFormData = new FormData();
    travFormData.append("file", blob, "traversal-test.png");
    travFormData.append("folder", "../../sensitive-dir");

    const resTrav = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: { "x-admin-pin": ADMIN_PIN },
      body: travFormData,
    });
    const travData = await resTrav.json().catch(() => ({}));
    const preventsTraversal = !travData.url || (!travData.url.includes("..") && !travData.url.includes("sensitive-dir"));
    recordTest(
      "UPL-006",
      "POST /api/admin/upload sanitizes directory traversal in folder param",
      "Image Security",
      "Critical",
      preventsTraversal,
      `URL returned: ${travData.url}`
    );
  } catch (err) {
    recordTest("UPL-ERR", "Upload test suite failed", "Image Storage", "Critical", false, err.message);
  }

  // -----------------------------------------------------------------
  // 7. SECURITY HEADERS AUDIT
  // -----------------------------------------------------------------
  console.log("\n--- 7. Auditing Security Headers ---");
  try {
    const resHeaders = await fetch(`${BASE_URL}/`);
    const h = resHeaders.headers;

    const xContentType = h.get("x-content-type-options");
    recordTest(
      "SEC-HDR-001",
      "X-Content-Type-Options: nosniff header present",
      "Security Headers",
      "Medium",
      xContentType === "nosniff",
      `Value: ${xContentType}`
    );

    const xFrame = h.get("x-frame-options");
    recordTest(
      "SEC-HDR-002",
      "X-Frame-Options: SAMEORIGIN or DENY present",
      "Security Headers",
      "Medium",
      ["SAMEORIGIN", "DENY"].includes(xFrame || ""),
      `Value: ${xFrame}`
    );

    const referrerPolicy = h.get("referrer-policy");
    recordTest(
      "SEC-HDR-003",
      "Referrer-Policy header present",
      "Security Headers",
      "Low",
      !!referrerPolicy,
      `Value: ${referrerPolicy}`
    );

    const permPolicy = h.get("permissions-policy");
    recordTest(
      "SEC-HDR-004",
      "Permissions-Policy header configured",
      "Security Headers",
      "Low",
      !!permPolicy,
      `Value: ${permPolicy}`
    );

    const hsts = h.get("strict-transport-security");
    recordTest(
      "SEC-HDR-005",
      "Strict-Transport-Security (HSTS) header present",
      "Security Headers",
      "Medium",
      !!hsts,
      `Value: ${hsts || "MISSING in next.config.ts"}`
    );
  } catch (err) {
    recordTest("SEC-HDR-ERR", "Security headers inspection failed", "Security Headers", "Medium", false, err.message);
  }

  // -----------------------------------------------------------------
  // 8. SEO & METADATA VERIFICATION
  // -----------------------------------------------------------------
  console.log("\n--- 8. Testing SEO & Metadata ---");
  try {
    const resHome = await fetch(`${BASE_URL}/`);
    const homeHtml = await resHome.text();
    const hasTitle = /<title>[^<]+<\/title>/.test(homeHtml);
    const hasMetaDesc = /<meta\s+name=["']description["']/i.test(homeHtml);
    const hasOg = /<meta\s+property=["']og:/i.test(homeHtml);
    const hasNoDanglingPipe = !/<title>[^<]*\|\s*<\/title>/.test(homeHtml);

    recordTest("SEO-001", "Home page has <title> tag", "SEO", "High", hasTitle, `Title found: ${hasTitle}`);
    recordTest("SEO-002", "Home page has <meta name='description'>", "SEO", "High", hasMetaDesc, `Desc found: ${hasMetaDesc}`);
    recordTest("SEO-003", "Home page has Open Graph tags", "SEO", "Medium", hasOg, `OG found: ${hasOg}`);
    recordTest("SEO-004", "Browser title does not end in dangling pipe", "SEO", "High", hasNoDanglingPipe, `Safe title: ${hasNoDanglingPipe}`);

    // Check robots.txt content
    const resRobots = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await resRobots.text();
    const disallowsAdmin = robotsText.includes("Disallow: /admin");
    recordTest(
      "SEO-005",
      "robots.txt disallows /admin route from search crawlers",
      "SEO",
      "High",
      disallowsAdmin,
      `Disallow /admin present: ${disallowsAdmin}`
    );

    // Check admin page has robots noindex
    const resAdmin = await fetch(`${BASE_URL}/admin`);
    const adminHtml = await resAdmin.text();
    const adminNoIndex = adminHtml.includes("noindex");
    recordTest(
      "SEO-006",
      "Admin layout outputs noindex meta tag",
      "SEO",
      "High",
      adminNoIndex,
      `noindex found in /admin: ${adminNoIndex}`
    );
  } catch (err) {
    recordTest("SEO-ERR", "SEO test suite failed", "SEO", "Medium", false, err.message);
  }

  // -----------------------------------------------------------------
  // 9. CONCURRENCY & RACE CONDITIONS
  // -----------------------------------------------------------------
  console.log("\n--- 9. Testing Concurrency & Rapid Submissions ---");
  try {
    const rapidCount = 5;
    const promises = [];
    for (let i = 0; i < rapidCount; i++) {
      promises.push(
        fetch(`${BASE_URL}/api/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `Rapid Applicant ${i}`,
            email: `rapid.${Date.now()}.${i}@example.com`,
            phone: `+91 999990000${i}`,
            course: "New Age Digital Marketing",
          }),
        })
      );
    }
    const responses = await Promise.all(promises);
    const allSuccessful = responses.every((r) => r.status === 200);
    recordTest(
      "RACE-001",
      `Concurrent lead submission (${rapidCount} simultaneous requests) handles all cleanly`,
      "Concurrency",
      "Medium",
      allSuccessful,
      `Statuses: ${responses.map((r) => r.status).join(", ")}`
    );

    // Clean up created rapid leads
    for (const r of responses) {
      try {
        const d = await r.json();
        if (d.lead?.id) {
          await fetch(`${BASE_URL}/api/leads?id=${encodeURIComponent(d.lead.id)}`, {
            method: "DELETE",
            headers: { "x-admin-pin": ADMIN_PIN },
          });
        }
      } catch {}
    }
  } catch (err) {
    recordTest("RACE-ERR", "Concurrency test failed", "Concurrency", "Medium", false, err.message);
  }

  // -----------------------------------------------------------------
  // SUMMARY REPORT
  // -----------------------------------------------------------------
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log("\n=================================================");
  console.log("TEST SUMMARY REPORT");
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
  console.log("=================================================");

  const reportPath = path.join(process.cwd(), "qa-full-audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify({ total, passed, failed, results }, null, 2));
  console.log(`Detailed JSON report saved to ${reportPath}`);
}

runTestSuite().catch(console.error);
