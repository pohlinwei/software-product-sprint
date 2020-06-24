package com.google.sps.commentart;

import java.awt.Color;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/** Painter determines the paints that should be used for painting. */
public class Painter {
  private final Map<String, Palette> paints = new HashMap<>(); 

  /** Adds a {@code Palette} to {@code this). */
  public void addPalette(Palette palette) {
    paints.put(palette.getId(), palette);
  }

  /** 
   * Updates the paint used by {@code Painter}.
   * @param keyString Key that is associated with the {@code Palette} which will be affected.
   * @param colour The colour used to update {@code Painter}.
   */
  public void update(String keyString, Color colour) {
    Palette palette = paints.get(keyString);
    palette.addColour(colour);
  }

  /** Gets all paints that are available. */
  public List<Color> getPaints() {
    return paints.values()
        .stream()
        .map(palette -> palette.getResultantColour())
        .collect(Collectors.toList());
  }
}
