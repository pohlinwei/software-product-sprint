package com.google.sps.commentart;

public class Reply {
  private String responderName;
  private String response;
  private int sentiment;

  public Reply(String responderName, String response, int sentiment) {
    this.responderName = responderName;
    this.response = response;
    this.sentiment = sentiment;
  }
}
