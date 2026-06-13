import React from 'react';
import "./Divider.css";


export function Divider({ className = ''}) {
  return (
    <hr
      className={`divider ${className}`}
      aria-hidden="true"
    />
  );
}