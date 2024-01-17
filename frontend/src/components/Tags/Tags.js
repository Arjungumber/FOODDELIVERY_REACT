import React from "react";
import classes from "./tags.module.css";
import { Link } from "react-router-dom";

export default function Tags({ tags, forFoodPage }) {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
        // for the homepage we want it at start while for the foodpage we want it in the center
      }}
    >
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && `(${tag.count})`}
          {/* inside the food page we dont wanna show the tag counts */}
        </Link>
      ))}
    </div>
  );
}
