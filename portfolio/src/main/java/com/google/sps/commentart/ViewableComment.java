package com.google.sps.commentart;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import java.util.ArrayList;
import java.util.List;

/** Represents a comment that can be used to create a viewable comment. */
public class ViewableComment {
  private String commentId;
  private String commenterName;
  private String message;
  private String commentColour;
  private List<ViewableReply> replies;

  private ViewableComment(String commentId, String commenterName, String message, String commentColour, 
      List<ViewableReply> replies) {
    this.commentId = commentId;
    this.commenterName = commenterName;
    this.message = message;
    this.commentColour = commentColour;
    this.replies = new ArrayList<>(replies);
  }

  /** Uses {@code Entity} to create {@code ViewableComment} instance. */
  public static ViewableComment toComment(Entity commentEntity, Iterable<Entity> replyEntities) {
    String commenterName = (String) commentEntity.getProperty("commenterName");
    String message = (String) commentEntity.getProperty("message");
    String commentColour = (String) commentEntity.getProperty("commentColour");
    Key commentKey = commentEntity.getKey();
    String commentId = KeyFactory.keyToString(commentKey);

    List<ViewableReply> replies = new ArrayList<>();
    for (Entity replyEntity : replyEntities) {
      replies.add(ViewableReply.toReply(replyEntity)); 
    }

    return new ViewableComment(commentId, commenterName, message, commentColour, replies);
  }
}
