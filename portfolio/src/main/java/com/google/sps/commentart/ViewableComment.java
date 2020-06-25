package com.google.sps.commentart;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import java.util.ArrayList;
import java.util.List;

/** Represents a comment that can be used to create a viewable comment. */
public class ViewableComment {
  private final String commentId;
  private final String commenterName;
  private final String message;
  private final String commentColour;
  private final List<ViewableReply> replies;

  /** Uses {@code Entity} to create {@code ViewableComment} instance. */
  public ViewableComment(Entity commentEntity, Iterable<Entity> replyEntities) {
    commenterName = (String) commentEntity.getProperty("commenterName");
    message = (String) commentEntity.getProperty("message");
    commentColour = (String) commentEntity.getProperty("commentColour");
    Key commentKey = commentEntity.getKey();
    commentId = KeyFactory.keyToString(commentKey);

    replies = new ArrayList<>();
    for (Entity replyEntity : replyEntities) {
      replies.add(new ViewableReply(replyEntity)); 
    }
  }
}
