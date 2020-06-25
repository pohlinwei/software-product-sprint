package com.google.sps.commentart;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;

import java.awt.Color;
import java.io.IOException;

/** A utility class for CommentArt. */
public class Utility {
  /** Gets the colour that is associated with the given message.  */
  public static Color getColour(String message) throws IOException {
    return getColour(getSentiment(message));
  }

  /** Gets sentiment of the given message. */
  private static double getSentiment(String message) throws IOException {
    Document doc =
        Document.newBuilder().setContent(message).setType(Document.Type.PLAIN_TEXT).build();
    LanguageServiceClient languageService = LanguageServiceClient.create();
    double score = languageService.analyzeSentiment(doc).getDocumentSentiment().getScore();
    languageService.close();
    return score;
  }

  /** Gets the colour that is mapped to the specified sentiment. */
  private static Color getColour(double sentiment) {
    boolean isNegative = sentiment < 0;

    int MAX_COLOUR_VAL = 255;
    // alphaVal should be >= 0.1 * MAX_COLOUR_VAL and <= MAX_COLOUR_VAL
    int alphaVal = (int) ((Math.abs(sentiment) * 0.9 + 0.1) * MAX_COLOUR_VAL);

    if (isNegative) {
      return new Color(0, 0, MAX_COLOUR_VAL, alphaVal);
    } else {
      return new Color(MAX_COLOUR_VAL, MAX_COLOUR_VAL, 0, alphaVal);
    }
  }

  /**
   * Converts {@code Color} to a string.
   * @param colour Colour that is to be converted to a string.
   * @return A string representation of the colour in rgba format, where rgb values are between 0 
   *    and 255 while alpha is a value between 0 and 1.
   */
  public static String colorToString(Color colour) {
    int red = colour.getRed();
    int green = colour.getGreen();
    int blue = colour.getBlue();
    double alpha = (double) colour.getAlpha() / 255; // converts alpha value to be between 0 and 1

    return String.format("rgba(%d,%d,%d,%.3f)", red, green, blue, alpha);
  }

  /**
   * Converts a string representation to {@code Color}.
   * @param colourStr String representation of colour in rgba, where rgb values are between 0 
   *    and 255 while alpha is a value between 0 and 1.
   */
  public static Color stringToColor(String colourStr) {
    String rgbaString = colourStr.substring(5, colourStr.length() - 1); 
    String[] rgbaValues = rgbaString.split(",");

    int red = Integer.parseInt(rgbaValues[0]);
    int blue = Integer.parseInt(rgbaValues[1]);
    int green = Integer.parseInt(rgbaValues[2]);
    int alpha = (int) (Double.parseDouble(rgbaValues[3]) * 255); // converts alpha value to be between 0 and 255

    return new Color(red, green, blue, alpha);
  }
}
