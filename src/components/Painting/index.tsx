import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import useDraw from 'src/hooks/useDrow';
import useColors from 'src/hooks/useColor';

const CanvasConatainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  & > div {
    margin-left: 10px;
    button {
      min-width: 65px;
    }
  }
`;

const Canvas = styled.canvas`
  border: 1px solid #000;
`;

const ColorPickerBtn = styled.button`
  background-color: #fff;
  height: 40px;
  border: 1px solid #ccc;
`;

const ColorPickerBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: 47px;
  background-color: #fff;
  z-index: 1;

  .sketch-picker {
    border-radius: 0px !important;
  }
`;

const RangeBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #fff;
  font-size: 12px;
  input {
    margin-left: 10px;
  }
`;

const ResetBtn = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  height: 40px;
`;

const SaveBtn = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  height: 40px;
`;

const EraserBtn = styled.button`
  cursor: pointer;
  margin: 10px 0px 5px 5px;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const TextBox = styled.span`
  display: inline-block;
  width: 66px;
`;

interface canvasProps {
  width: number;
  height: number;
}

interface location {
  x: number;
  y: number;
}

function downloadImage(data = '', filename = 'untitled.jpeg') {
  const a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

const PaintingContents = ({ width, height }: canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { color, changeColor } = useColors();
  const [showColorPicker, setShowState] = useState(false);
  const [useEraser, setEraser] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [eraserWidth, setEraserWidth] = useState(20);
  const { mousePosition, onPaint, changeMousePosition, changePaintState } = useDraw();

  const changeEraser = useCallback(() => {
    setEraser(state => !state);
  }, []);

  const getLocation = useCallback((event: MouseEvent): location | void => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    return {
      x: event.clientX,
      y: event.clientY - canvas.offsetTop
    };
  }, []);

  const changeShowState = useCallback(() => {
    setShowState(state => !state);
  }, []);

  const startPaint = useCallback(
    (event: MouseEvent): void => {
      const location = getLocation(event);
      if (location) {
        changePaintState(true);
        changeMousePosition(location);
      }
    },
    [changeMousePosition, changePaintState, getLocation]
  );

  const stopPaint = useCallback(() => {
    changePaintState(false);
  }, [changePaintState]);

  const changeStroke = useCallback(e => {
    setStrokeWidth(() => e.target.value);
  }, []);
  const changeEraserStroke = useCallback(e => {
    setEraserWidth(() => e.target.value);
  }, []);

  const draw = useCallback(
    (BFmousePosition: location, AFmousePosition: location) => {
      if (!canvasRef.current) return;
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const relPosition = canvas.getBoundingClientRect();
      if (ctx) {
        ctx.strokeStyle = useEraser ? '#ffffff' : color;
        ctx.lineJoin = 'round';
        ctx.lineWidth = useEraser ? eraserWidth : strokeWidth;
        ctx.beginPath();
        ctx.moveTo(BFmousePosition.x - relPosition.x, BFmousePosition.y - relPosition.y);
        ctx.lineTo(AFmousePosition.x - relPosition.x, AFmousePosition.y - relPosition.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    [useEraser, color, eraserWidth, strokeWidth]
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (onPaint) {
        const newLocation = getLocation(event);
        if (mousePosition && newLocation) {
          draw(mousePosition, newLocation);
          changeMousePosition(newLocation);
        }
      }
    },
    [onPaint, getLocation, mousePosition, draw, changeMousePosition]
  );

  const resetPath = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const savePaint = () => {
    const data = canvasRef.current?.toDataURL('image/jpeg', 1.0);
    downloadImage(data, 'masterpiece.jpeg');
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', stopPaint);
      canvas.removeEventListener('mouseleave', stopPaint);
    };
  }, [startPaint, paint, stopPaint]);

  return (
    <CanvasConatainer>
      <Canvas ref={canvasRef} height={height} width={width}></Canvas>
      <div>
        <ColorPickerBtn onClick={changeShowState}>붓 설정</ColorPickerBtn>
        <ResetBtn onClick={resetPath}>전체 지우기</ResetBtn>
        <SaveBtn onClick={savePaint}>그림만 저장</SaveBtn>
        {showColorPicker && (
          <ColorPickerBox>
            <SketchPicker
              disableAlpha={true}
              color={color}
              onChangeComplete={(color: { hex: string }) => {
                changeColor(color.hex);
                if (useEraser) {
                  changeEraser();
                }
              }}
            />
            <RangeBox>
              <TextBox>펜 굵기:</TextBox>
              <input
                type='range'
                defaultValue={strokeWidth}
                onChange={changeStroke}
                max={20}
                min={1}
                step={1}
              />
            </RangeBox>
            <RangeBox>
              <TextBox>지우개 크기:</TextBox>
              <input
                type='range'
                value={eraserWidth}
                onChange={changeEraserStroke}
                max={40}
                min={10}
                step={2}
              />
            </RangeBox>
            <EraserBtn onClick={changeEraser}>{useEraser ? '펜 사용' : '지우개 사용'}</EraserBtn>
          </ColorPickerBox>
        )}
      </div>
    </CanvasConatainer>
  );
};

export const Painting = React.memo(PaintingContents);
