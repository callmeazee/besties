# Besties - Complete Fix Checklist

## ✅ Fixed Previously
- [x] Login.tsx - `data` import bug
- [x] EditProfileModal.tsx - Wrong API endpoint `/auth/update-profile` → `/auth/profile`
- [x] FriendList.tsx - Hardcoded mock data → real API fetch
- [x] FriendsOnline.tsx - `id` vs `_id` mismatch in filter
- [x] Layout.tsx - Syntax error `};;;` 
- [x] Backend: Added `bio` field to Auth model
- [x] Backend: Added `updateProfile` controller + route
- [x] Chat.tsx - Complete rewrite with proper message sending, attachment handling, stable conversation list

## 🔴 CRITICAL: Video/Audio WebRTC Not Working - ROOT CAUSE FIXES
- [ ] Frontend: Socket never emits "join" for user's room - video socket needs this
- [ ] Frontend: AuthGuard needs to emit "join" after socket connects with user ID
- [ ] Backend: Status socket already joins room via cookie - use consistent room strategy
- [ ] Layout.tsx: Incoming call modal needs liveActiveSession to show - ensure socketId is populated

## Verification
- [ ] Build passes
- [ ] Chat works (send/receive messages, attachments)
- [ ] Video/Audio calls connect