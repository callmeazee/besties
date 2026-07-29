import type { Socket } from "socket.io-client";

import logger from "./logger";

import { SOCKET_EVENTS } from "./constants";

import type {
  OfferPayload,
  AnswerPayload,
  CandidatePayload,
  EndCallPayload,
  JoinPayload,
  CallUser,
} from "../types/webrtc";

export interface SocketSignalingEvents {
  onOffer?: (payload: OfferPayload) => void;

  onAnswer?: (payload: AnswerPayload) => void;

  onCandidate?: (payload: CandidatePayload) => void;

  onEnd?: (payload: EndCallPayload) => void;
}

export default class SocketSignaling {
  private socket: Socket;

  private events?: SocketSignalingEvents;

  constructor(socket: Socket, events?: SocketSignalingEvents) {
    this.socket = socket;

    this.events = events;
  }

  /**
   * ======================================
   * Connect Listeners
   * ======================================
   */

  connect() {
    logger.socket("Registering listeners");

    this.socket.on(SOCKET_EVENTS.OFFER, this.handleOffer);

    this.socket.on(SOCKET_EVENTS.ANSWER, this.handleAnswer);

    this.socket.on(SOCKET_EVENTS.CANDIDATE, this.handleCandidate);

    this.socket.on(SOCKET_EVENTS.END, this.handleEnd);
  }

  /**
   * ======================================
   * Disconnect Listeners
   * ======================================
   */

  disconnect() {
    logger.socket("Removing listeners");

    this.socket.off(SOCKET_EVENTS.OFFER, this.handleOffer);

    this.socket.off(SOCKET_EVENTS.ANSWER, this.handleAnswer);

    this.socket.off(SOCKET_EVENTS.CANDIDATE, this.handleCandidate);

    this.socket.off(SOCKET_EVENTS.END, this.handleEnd);
  }

  /**
   * ======================================
   * Join Room
   * ======================================
   */

  join(payload: JoinPayload) {
    logger.socket("Joining", payload.userId);

    this.socket.emit(SOCKET_EVENTS.JOIN, payload.userId);
  }

  /**
   * ======================================
   * Send Offer
   * ======================================
   */

  sendOffer(payload: {
    offer: RTCSessionDescriptionInit;
    to: string;
    from: CallUser;
    type: "audio" | "video";
  }) {
    logger.socket("Offer Sent");

    this.socket.emit(SOCKET_EVENTS.OFFER, payload);
  }

  /**
   * ======================================
   * Send Answer
   * ======================================
   */

  sendAnswer(payload: { answer: RTCSessionDescriptionInit; to: string }) {
    logger.socket("Answer Sent");

    this.socket.emit(SOCKET_EVENTS.ANSWER, payload);
  }

  /**
   * ======================================
   * Send Candidate
   * ======================================
   */

  sendCandidate(payload: { candidate: RTCIceCandidate; to: string }) {
    this.socket.emit(SOCKET_EVENTS.CANDIDATE, payload);
  }

  /**
   * ======================================
   * End Call
   * ======================================
   */

  endCall(to: string) {
    logger.socket("Ending Call");

    this.socket.emit(SOCKET_EVENTS.END, {
      to,
    });
  }

  /**
   * ======================================
   * Incoming Offer
   * ======================================
   */

  private handleOffer = (payload: OfferPayload) => {
    logger.socket("Offer Received");

    this.events?.onOffer?.(payload);
  };

  /**
   * ======================================
   * Incoming Answer
   * ======================================
   */

  private handleAnswer = (payload: AnswerPayload) => {
    logger.socket("Answer Received");

    this.events?.onAnswer?.(payload);
  };

  /**
   * ======================================
   * Incoming Candidate
   * ======================================
   */

  private handleCandidate = (payload: CandidatePayload) => {
    this.events?.onCandidate?.(payload);
  };

  /**
   * ======================================
   * Incoming End
   * ======================================
   */

  private handleEnd = (payload: EndCallPayload) => {
    logger.socket("Call Ended");

    this.events?.onEnd?.(payload);
  };
}
