package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.gson.Gson;
import com.google.sps.commentart.Reply;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/add_reply")
public class AddReplyServlet extends HttpServlet {
  private final Gson gson = new Gson();
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override 
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // TODO: Add validation
    String responseStr = getParameter(request, "response", "");
    String responderName = getParameter(request, "responderName", "");
    String managerKeyStr = getParameter(request, "id", "");
    long timestamp = System.currentTimeMillis();

    // TODO: add sentiment
    int sentiment = 0;

    Key managerKey = KeyFactory.stringToKey(managerKeyStr);

    Entity replyEntity = new Entity("Reply", managerKey);
    replyEntity.setProperty("responderName", responderName);
    replyEntity.setProperty("response", response);
    replyEntity.setProperty("sentiment", sentiment);
    replyEntity.setProperty("timestamp", timestamp);

    datastore.put(replyEntity);
    
    Reply reply = new Reply(responderName, responseStr, sentiment);
    String json = gson.toJson(reply);
    response.setContentType("application/json;");
    response.getWriter().println(json);
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
