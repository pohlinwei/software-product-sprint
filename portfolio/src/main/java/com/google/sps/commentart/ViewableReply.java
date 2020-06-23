package com.google.sps.commentart;

import com.google.appengine.api.datastore.Entity;

/** Represents a reply that can be used to create a viewable reply. */
public class ViewableReply {
  private String responderName;
  private String replyMsg;
  private String replyColour;

  private ViewableReply(String responderName, String replyMsg, String replyColour) {
    this.responderName = responderName;
    this.replyMsg = replyMsg;
    this.replyColour = replyColour;
  }

  /** Uses {@code Entity} to create {@code ViewableReply} instance. */
  static ViewableReply toReply(Entity replyEntity) {
    String responderName = (String) replyEntity.getProperty("responderName");
    String replyMsg = (String) replyEntity.getProperty("replyMsg");
    String replyColour = (String) replyEntity.getProperty("replyColour");
    return new ViewableReply(responderName, replyMsg, replyColour);
  }
}
