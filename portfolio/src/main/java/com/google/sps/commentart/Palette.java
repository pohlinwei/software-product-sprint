package com.google.sps.commentart;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;

import java.util.ArrayList;
import java.util.List;
import java.awt.Color;

/** 
 * Palette which contains the main colour, desired other colours and resultant colour (as determined by
 *  main colour and the other colours).
 */
public class Palette {
  private String id;
  private Color resultantColour;
  private Color mainColour;
  private List<Color> otherColours;

  /**
   * @param id Id that is to be associated with {@code this}.
   * @param mainColour {@code Palette}'s main colour.
   * @param replyColours Other colours that are associated with {@code this}.
   */
  public Palette(String id, Color mainColour, List<Color> otherColours) {
    this.id = id;
    this.mainColour = mainColour;
    this.otherColours = new ArrayList<>(otherColours);
    this.resultantColour = getPaint();
  }

  /** Gets id of {@code this}. */
  public String getId() {
    return id;
  }

  /** Adds a colour to {@code Palette}. */
  public void addColour(Color colour) {
    otherColours.add(colour);
    resultantColour = getPaint();
  }

  /** Gets resultant colour. */
  public Color getResultantColour() {
    return resultantColour;
  }

  /** Uses {@code commentEntity} and {@code replyEntities} to create a {@code Palette}. */
  public static Palette toPalette(Entity commentEntity, Iterable<Entity> replyEntities) {
    String commentId = KeyFactory.keyToString(commentEntity.getKey());
    Color commentColour = Utility.stringToColor((String) commentEntity.getProperty("commentColour"));
    List<Color> replyColours = new ArrayList<>();
    replyEntities.forEach(replyEntity -> {
      String colourStr = (String) replyEntity.getProperty("replyColour");
      replyColours.add(Utility.stringToColor(colourStr));
    });
    return new Palette(commentId, commentColour, replyColours);
  }

  private Color getPaint() {
    double MAIN_WEIGHT = 0.5;
    double otherWeight = (1 - MAIN_WEIGHT) / otherColours.size();

    double resultantRed = 0;
    double resultantGreen = 0;
    double resultantBlue = 0;
    double resultantAlpha = 0;

    for (Color colour : otherColours) {
      resultantRed += (colour.getRed() * otherWeight);
      resultantGreen += (colour.getGreen() * otherWeight);
      resultantBlue += (colour.getBlue() * otherWeight);
      resultantAlpha += (colour.getAlpha() * otherWeight);
    }

    resultantRed += (MAIN_WEIGHT * mainColour.getRed());
    resultantGreen += (MAIN_WEIGHT * mainColour.getGreen());
    resultantBlue += (MAIN_WEIGHT * mainColour.getBlue());
    resultantAlpha += (MAIN_WEIGHT * mainColour.getAlpha());

    return new Color((int) resultantRed, (int) resultantGreen, (int) resultantBlue, (int) resultantAlpha);
  }
}
