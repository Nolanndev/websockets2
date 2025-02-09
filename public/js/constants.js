export const messageSocketTypes = {
    MESSAGE: 1,
    JOIN: 2,
    LEAVE: 3,
    CALL_REQUEST: 4,      // Demande d'appel
    CALL_ACCEPT: 5,       // Acceptation d'appel
    CALL_REJECT: 6,       // Refus d'appel
    CALL_END: 7,          // Fin d'appel
    CHAT_MESSAGE: 8,      // Message de chat
    WEBRTC_OFFER: 9,      // Offre WebRTC
    WEBRTC_ANSWER: 10,    // Réponse WebRTC
    ICE_CANDIDATE: 11     // Candidat ICE pour WebRTC
};