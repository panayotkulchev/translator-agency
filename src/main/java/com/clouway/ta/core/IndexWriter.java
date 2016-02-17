package com.clouway.ta.core;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

/**
 * @author Miroslav Genov (mgenov@gmail.com)
 */
public class IndexWriter {

  public static Set<String> createIndex(String... words) {

    Set<String> index = new HashSet<String>();
    for (String word : words) {

      if (word != null) {
        word = word.toLowerCase();
        index.add(word);

        String[] tokens = word.split("\\s");
        for (String token : tokens) {

          index.addAll(normalizeToken(token));
        }

        tokens = word.split("\\.");

        normalizeTokens(index, tokens);

        tokens = word.split("\\~");

        normalizeTokens(index, tokens);

        tokens = word.split("\\:");

        normalizeTokens(index, tokens);

        tokens = word.split("\\-");

        normalizeTokens(index, tokens);
      }

    }

    return index;
  }

  public Set<String> createIndexWithPrefix(String prefix, String... words) {
    Set<String> index = createIndex(words);
    Set<String> newSet = new HashSet<String>();
    for (String string : index) {
      newSet.add(prefix + string);
    }
    return newSet;
  }

  private static void normalizeTokens(Set<String> index, String[] tokens) {
    for (String token : tokens) {
      index.addAll(normalizeToken(token));
    }

  }

  private static Set<String> normalizeToken(final String token) {

    Set<String> tokens = new TreeSet<String>();

    for (int i = 0; i < token.length(); i++) {
      String word = token.substring(i, token.length());

      tokens.add(word);
    }

    for (int i = 1; i < token.length(); i++) {
      String word = token.substring(0, token.length() - i);
      tokens.add(word);
    }

    for (int i = 0; i < token.length() / 2; i++) {
      String word = token.substring(i, token.length() - i);

      tokens.add(word);
    }

    return tokens;
  }
}
