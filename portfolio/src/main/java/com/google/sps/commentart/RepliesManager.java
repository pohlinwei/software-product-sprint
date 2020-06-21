package com.google.sps.commentart;

import java.util.ArrayList;
import java.util.List;

public class RepliesManager {
  private List<Reply> replies;
  private String id;

  public RepliesManager(String id) {
    this.id = id;
    replies = new ArrayList<>();
  }

  public RepliesManager(List<Reply> replies, String id) {
    this.id = id;
    this.replies = replies;
  }

  public void addReply(Reply reply) {
    replies.add(reply);
  }
}
