# Firestore Security Specification - Ehsan Ahmad Portfolio

## Data Invariants
1. A portfolio item must have a title, imageUrl, and category.
2. A video item must have a videoUrl.
3. Only the specific admin user (mawlanaehsan24@gmail.com) can perform write operations.

## The "Dirty Dozen" Payloads (Deny cases)
1. Unauthenticated user trying to create a portfolio item.
2. Authenticated non-admin user trying to update site config.
3. Admin trying to create a portfolio item without a title.
4. Admin trying to update a portfolio item with a 2MB description string (DoS check).
5. Admin trying to inject an unauthorized field into site config.
6. Admin trying to bypass 'createdAt' immutability.
... (and more as per standard audit)

## Role Mapping
- Public: Can 'get' and 'list' all collections.
- Admin (mawlanaehsan24@gmail.com): Full access.
