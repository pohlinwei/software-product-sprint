package com.google.sps.commentart;

/** Represents a comment. */
public class Comment {
  private String commenterName;
  private String commentMsg;
  private double sentiment;
  private RepliesManager repliesManager;

  public Comment(String commenterName, String commentMsg, double sentiment, RepliesManager repliesManager) {
    this.commenterName = commenterName;
    this.commentMsg = commentMsg;
    this.sentiment = sentiment;
    this.repliesManager = repliesManager;
  }
}
