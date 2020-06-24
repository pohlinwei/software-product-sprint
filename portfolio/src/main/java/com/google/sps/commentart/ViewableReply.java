package com.google.sps.commentart;

import com.google.appengine.api.datastore.Entity;

/** Represents a reply that can be used to create a viewable reply. */
class ViewableReply {
  private final String responderName;
  private final String replyMsg;
  private final String replyColour;

  /** Uses {@code Entity} to create {@code ViewableReply} instance. */
  ViewableReply(Entity replyEntity) {
    responderName = (String) replyEntity.getProperty("responderName");
    replyMsg = (String) replyEntity.getProperty("replyMsg");
    replyColour = (String) replyEntity.getProperty("replyColour");
  }
}
