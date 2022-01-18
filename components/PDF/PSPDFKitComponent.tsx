import Log from 'helper/Logging'
import React, { useEffect, useRef } from 'react'

export default function PSPDFKitComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit;
    try {
      (async function() {
        PSPDFKit = await import("pspdfkit");
        instance = await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: "/example.pdf",
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/`
        });
      })();
    } catch (error) {
      console.log("ERROR", error);
    }

    instance?.addEventListener("annotations.load", loadedAnnotations => {
      Log.debug('PDF', "annotations.load", loadedAnnotations);
    });
    instance?.addEventListener("annotations.willChange", event => {
      Log.debug('PDF', "annotations.willChange", event);
      if (event.reason === PSPDFKit.AnnotationsWillChangeReason.DRAW_START) {
        console.log("The user is drawing...");
      }
    });
    instance?.addEventListener("annotations.change", () => {
      Log.debug('PDF', "annotations.change", null);
      console.log("Something in the annotations has changed.");
    });
    instance?.addEventListener("annotations.create", createdAnnotations => {
      Log.debug('PDF', "annotations.create", createdAnnotations);
      console.log(createdAnnotations);
    });
    instance?.addEventListener("annotations.update", updatedAnnotations => {
      Log.debug('PDF', "annotations.update", updatedAnnotations);
      console.log(updatedAnnotations);
    });
    instance?.addEventListener("annotations.delete", deletedAnnotations => {
      Log.debug('PDF', "annotations.delete", deletedAnnotations);
      console.log(deletedAnnotations);
    });

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh"}}/>
  );
}