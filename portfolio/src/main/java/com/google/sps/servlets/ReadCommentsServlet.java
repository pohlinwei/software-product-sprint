package com.google.sps.servlets;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.commentart.Palette;
import com.google.sps.commentart.Utility;
import com.google.sps.commentart.ViewableComment;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns a list of comments that are posted on CommentArt. */
@WebServlet("/read_comments")
public class ReadCommentsServlet extends CommentArtServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query commentQuery = new Query("CommentWithSenti").addSort("timestamp", SortDirection.ASCENDING);
    PreparedQuery commentsResults = datastore.prepare(commentQuery);

    List<ViewableComment> comments = new ArrayList<>();
    for (Entity commentEntity : commentsResults.asIterable()) {
      Iterable<Entity> replyEntities = getReplyEntities(commentEntity.getKey());
      comments.add(new ViewableComment(commentEntity, replyEntities));
      painter.addPalette(Palette.toPalette(commentEntity, replyEntities)); 
    }

    List<String> paints = new ArrayList<>();
    painter.getPaints().forEach(paint -> paints.add(Utility.colorToString(paint))); 
    ReadResponse readResponse = new ReadResponse(comments, paints);

    String json = gson.toJson(readResponse);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /** Gets all {@code Entity}s whose ancestor is associated with {@code commentKey}. */
  private Iterable<Entity> getReplyEntities(Key commentKey) {
    Query repliesQuery = new Query("Reply").setAncestor(commentKey)
        .addSort("timestamp", SortDirection.ASCENDING);
    PreparedQuery repliesResults = datastore.prepare(repliesQuery);
    return repliesResults.asIterable();
  }

  /** Representation of the response returned as a result of a POST request to {@code ReadCommentsServlet}. */
  private class ReadResponse {
    List<ViewableComment> comments;
    List<String> paints;

    ReadResponse(List<ViewableComment> comments, List<String> paints) {
      this.comments = comments;
      this.paints = paints;
    }
  }
}
