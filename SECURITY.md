---

```md
# Security Considerations for Chunked File Upload

This uploader component is designed with security awareness in mind.  
When integrating with a real backend, the following measures **must** be enforced server-side.

---

## 1 File Size Limits

Always validate file size on the server.

Do not rely on frontend validation alone.

---

## 2 MIME Type Validation

Verify file types using MIME type and content inspection.

Prevent execution of malicious files disguised with extensions.

---

## 3 Checksum Verification

Each chunk includes a checksum.

The server should verify this checksum to ensure:

- Data integrity
- No tampering during upload
- Correct chunk ordering

---


## 4 Rate Limiting & DOS Protection

Chunked uploads reduce large payload risk, but server should still:

- Rate limit upload endpoints
- Prevent repeated malicious requests

---

## 5 Server-side Chunk Assembly Validation

When reassembling chunks:

- Validate total chunks
- Validate chunk order
- Reject missing or duplicate chunks

---

## 5 Error Handling

Do not expose internal server errors to the client.  
Return generic error messages.

---

## Summary

This uploader is frontend-safe by design 