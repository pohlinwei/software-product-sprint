package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.commentart.Comment;
import com.google.sps.commentart.RepliesManager;
import com.google.sps.commentart.Reply;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns a list of comments that are posted on CommentArt. */
@WebServlet("/read_comments")
public class ReadCommentsServlet extends HttpServlet {
  private final Gson gson = new Gson();
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query commentQuery = new Query("CommentWithSenti").addSort("timestamp", SortDirection.ASCENDING);
    PreparedQuery results = datastore.prepare(commentQuery);

    List<Comment> comments = new ArrayList<>();
    for (Entity commentEntity : results.asIterable()) {
      comments.add(toComment(commentEntity));
    }
    String json = gson.toJson(comments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private Comment toComment(Entity commentEntity) {
    String commenterName = (String) commentEntity.getProperty("commenterName");
    String commentMsg = (String) commentEntity.getProperty("commentMsg");
    float sentiment = (float) commentEntity.getProperty("sentiment");

    Key commentKey = commentEntity.getKey();
    Query repliesManagerQuery = new Query("RepliesManager").setAncestor(commentKey);
    List<Entity> repliesManagerEntities = datastore.prepare(repliesManagerQuery)
        .asList(FetchOptions.Builder.withDefaults());
    // TODO: add assertion to ensure that there is only one manager entity
    Entity repliesManagerEntity = repliesManagerEntities.get(0);
    RepliesManager repliesManager = toRepliesManager(repliesManagerEntity);

    return new Comment(commenterName, commentMsg, sentiment, repliesManager);
  }

  private RepliesManager toRepliesManager(Entity repliesManagerEntity) {
    Key repliesManagerKey = repliesManagerEntity.getKey();
    String repliesManagerKeyStr = KeyFactory.keyToString(repliesManagerKey);
    RepliesManager repliesManager = new RepliesManager(repliesManagerKeyStr);

    Query replyQuery = new Query("Reply").setAncestor(repliesManagerKey)
      .addSort("timestamp", SortDirection.ASCENDING);
    Iterable<Entity> replyEntitiesIterator = datastore.prepare(replyQuery).asIterable();
    
    for (Entity replyEntity : replyEntitiesIterator) {
      repliesManager.addReply(toReply(replyEntity));
    }

    return repliesManager;
  }

  private Reply toReply(Entity replyEntity) {
    String responderName = (String) replyEntity.getProperty("responderName");
    String response = (String) replyEntity.getProperty("response");
    float sentiment = (float) replyEntity.getProperty("sentiment");
    return new Reply(responderName, response, sentiment);
  }
}
