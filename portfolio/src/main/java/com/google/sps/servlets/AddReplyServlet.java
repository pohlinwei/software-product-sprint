package com.google.sps.servlets;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.sps.commentart.Utility;

import java.awt.Color;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Adds a reply to the databse. */
@WebServlet("/add_reply")
public class AddReplyServlet extends CommentArtServlet {
  @Override 
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // TODO: Add validation
    String replyMsg = getParameter(request, "replyMsg", "");
    String responderName = getParameter(request, "responderName", "");
    String commentId = getParameter(request, "id", "");
    long timestamp = System.currentTimeMillis();

    Color replyColour = Utility.getColour(replyMsg);

    Key commentKey = KeyFactory.stringToKey(commentId);
    Entity replyEntity = new Entity("Reply", commentKey);
    replyEntity.setProperty("responderName", responderName);
    replyEntity.setProperty("replyMsg", replyMsg);
    replyEntity.setProperty("sentiment", replyColour); 
    replyEntity.setProperty("timestamp", timestamp);
    datastore.put(replyEntity);
    
    painter.update(commentId, replyColour);
    List<String> paints = new ArrayList<>();
    painter.getPaints().forEach(paint -> paints.add(Utility.colorToString(paint)));

    String json = gson.toJson(new AddReplyResponse(Utility.colorToString(replyColour), paints)); 
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /** Representation of the response returned as a result of a POST request to {@code AddReplyServlet}. */
  private class AddReplyResponse {
    String replyColour;
    List<String> paints;

    public AddReplyResponse(String replyColour, List<String> paints) {
      this.replyColour = replyColour;
      this.paints = paints;
    }
  }

  // TODO: abstract this function
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
