import "reflect-metadata";
import "@testing-library/jest-dom";
import React, { forwardRef } from "react";

class ClipboardEventMock extends Event {
  clipboardData: DataTransfer | null;

  constructor(type: string, clipboardData?: DataTransfer | null) {
    super(type);
    this.clipboardData = clipboardData || null;
  }
}

class DragEventMock extends Event {
  dataTransfer: DataTransfer | null;

  constructor(type: string, eventInitDict?: DragEventInit) {
    super(type, eventInitDict);
    this.dataTransfer = eventInitDict?.dataTransfer || null;
  }
}

function getBoundingClientRect(): DOMRect {
  //@ts-ignore
  const rec: DOMRect = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  return { ...rec, toJSON: () => rec };
}

class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item(index: number): DOMRect | null {
    return this[index];
  }
}

HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = getBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();

// These events are used to work with the current rich text editor
(global as any).ClipboardEvent = ClipboardEventMock;
(global as any).DragEvent = DragEventMock;
(document as any).elementFromPoint = (): null => null;
