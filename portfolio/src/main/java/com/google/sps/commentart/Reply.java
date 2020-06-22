package com.google.sps.commentart;

/** Represents a reply. */
public class Reply {
  private String responderName;
  private String replyMsg;
  private double sentiment;

  public Reply(String responderName, String replyMsg, double sentiment) {
    this.responderName = responderName;
    this.replyMsg = replyMsg;
    this.sentiment = sentiment;
  }
}
