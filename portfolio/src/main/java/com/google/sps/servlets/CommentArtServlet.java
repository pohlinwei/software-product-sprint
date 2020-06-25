package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.gson.Gson;
import com.google.sps.commentart.Painter;

import javax.servlet.http.HttpServlet;

/** Servlet contains all variables that are common to CommentArt app. */
public class CommentArtServlet extends HttpServlet {
  protected final static Painter painter = new Painter();
  protected final Gson gson = new Gson();
  protected final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
}
