package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.gson.Gson;
import com.google.sps.commentart.Comment;
import com.google.sps.commentart.RepliesManager;
import com.google.sps.commentart.SentimentUtility;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Adds comment to database. */
@WebServlet("/add_comment")
public class AddCommentServlet extends HttpServlet {
  private final Gson gson = new Gson();
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override 
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String commenterName = getParameter(request, "name", "");
    String commentMsg = getParameter(request, "message", "");
    long timestamp = System.currentTimeMillis();
    double sentiment = SentimentUtility.getSentiment(commentMsg);

    Entity commentEntity = new Entity("CommentWithSenti");
    commentEntity.setProperty("commenterName", commenterName);
    commentEntity.setProperty("commentMsg", commentMsg);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("sentiment", sentiment);
    datastore.put(commentEntity);

    Entity repliesManagerEntity = new Entity("RepliesManager", commentEntity.getKey());
    datastore.put(repliesManagerEntity);
    Key repliesManagerEntityKey = repliesManagerEntity.getKey();
    String repliesManagerEntityKeyStr = KeyFactory.keyToString(repliesManagerEntityKey);
    RepliesManager repliesManager = new RepliesManager(repliesManagerEntityKeyStr);
    
    Comment comment = new Comment(commenterName, commentMsg, sentiment, repliesManager);
    String json = gson.toJson(comment);
    response.setContentType("application/json;");
    response.getWriter().println(json);
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
