package com.google.sps.commentart;

public class Comment {
  private String commenterName;
  private String commentMsg;
  private int sentiment;
  private RepliesManager repliesManager;

  public Comment(String commenterName, String commentMsg, int sentiment, RepliesManager repliesManager) {
    this.commenterName = commenterName;
    this.commentMsg = commentMsg;
    this.sentiment = sentiment;
    this.repliesManager = repliesManager;
  }
}
