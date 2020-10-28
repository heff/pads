## Notes on Drum Responsiveness

// For testing the real timeness of the midi messages.
// Conclusion: Pretty instantanious to the browser.
// Lag seems be between the message and playing the video.
// After furter testing, it appears to be the recovery time of the video.
// If it has to seek, that seems to slow it down. which makes sense.
// Shortening the sound duration, fading out so it can be shorter, and duplicating pad videos all might help.
// With a single video test, short duration, the vide appears to play as quickly as I can hit the drum. Though still with some delay between the midi message and the actual playing of the video.

I think there's a little delay in the post message API of the youtube Iframe.

I also think there is some lag between play() and playing of the video.

It's also possible that there's some delay from multiple notes played at the same time getting queued by the single thread.
