package com.google.sps.servlets;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.sps.commentart.Palette;
import com.google.sps.commentart.Utility;

import java.awt.Color;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Adds comment to database. */
@WebServlet("/add_comment")
public class AddCommentServlet extends CommentArtServlet {
  @Override 
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String commenterName = getParameter(request, "commenterName", "");
    String message = getParameter(request, "message", "");
    long timestamp = System.currentTimeMillis();
    Color commentColour = Utility.getColour(message);
    String commentColourString = Utility.colorToString(commentColour);

    Entity commentEntity = new Entity("CommentWithSenti");
    commentEntity.setProperty("commenterName", commenterName);
    commentEntity.setProperty("message", message);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("commentColour", commentColourString);
    datastore.put(commentEntity);

    String commentId = KeyFactory.keyToString(commentEntity.getKey());
    painter.addPalette(new Palette(commentId, commentColour, new ArrayList<>()));
    
    List<String> paints = new ArrayList<>();
    painter.getPaints().forEach(paint -> paints.add(Utility.colorToString(paint)));

    AddCommentResponse addCommentResponse = 
        new AddCommentResponse(commentId, commentColourString, paints);
    String json = gson.toJson(addCommentResponse);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /** Representation of the response returned as a result of a POST request to {@code AddCommentServlet}. */
  private class AddCommentResponse {
    String commentId;
    String commentColour;
    List<String> paints;

    AddCommentResponse(String commentId, String commentColour, List<String> paints) {
      this.commentId = commentId;
      this.commentColour = commentColour;
      this.paints = paints;
    }
  }

  /**
   * Requests user-input value for the specified parameter, 
   * and returns the default value if the user-input value is null.
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
