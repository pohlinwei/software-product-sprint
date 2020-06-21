package com.google.sps.commentart;

public class Reply {
  private String responderName;
  private String response;
  private float sentiment;

  public Reply(String responderName, String response, float sentiment) {
    this.responderName = responderName;
    this.response = response;
    this.sentiment = sentiment;
  }
}
