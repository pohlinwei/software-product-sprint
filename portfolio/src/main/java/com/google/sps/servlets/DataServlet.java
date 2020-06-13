// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that receives user's comment (if any) and returns all users' comments for that session. */
// TODO: change class name, abstract comment to a class on its own and separate 'post' and 'get' servlets
@WebServlet("/comment")
public class DataServlet extends HttpServlet {
  private final List<String> comments = new ArrayList<>();
  private final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json = gson.toJson(comments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override 
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // TODO: Add validation
    String comment = getParameter(request, "comment", "");
    comments.add(comment);
    response.sendRedirect("/index.html#contact");
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
