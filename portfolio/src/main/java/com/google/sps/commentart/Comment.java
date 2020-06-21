package com.google.sps.commentart;

/** Represents a comment. */
public class Comment {
  private String commenterName;
  private String commentMsg;
  private float sentiment;
  private RepliesManager repliesManager;

  public Comment(String commenterName, String commentMsg, float sentiment, RepliesManager repliesManager) {
    this.commenterName = commenterName;
    this.commentMsg = commentMsg;
    this.sentiment = sentiment;
    this.repliesManager = repliesManager;
  }
}
