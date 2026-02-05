'use client';

import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/utils';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

interface ImageUploadProps {
  /**
   * 선택된 파일이 변경될 때 호출되는 콜백
   * @param file - 선택된 파일 또는 null (파일이 제거된 경우)
   */
  onFileChange: (file: File | null) => void;
  // 기본값으로 표시할 이미지 URL
  defaultImageUrl?: string;
  // 컴포넌트의 추가 클래스명
  className?: string;
  // 업로드 영역의 높이 (기본값: h-70)
  height?: string;
  // 비활성화 여부
  disabled?: boolean;
  // 에러 상태
  error?: boolean;
  // 파일 크기 제한 (Byte 단위, 기본값: 5MB)
  maxSize?: number;
}

function ImageUpload({
  onFileChange,
  defaultImageUrl,
  className,
  height = 'h-70',
  disabled = false,
  error = false,
  maxSize = 10 * 1024 * 1024, // 10MB
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImageUrl || null,
  );
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = useCallback(async (file: File): Promise<boolean> => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('JPG, PNG 형식의 이미지만 업로드 가능합니다.');
      return false;
    }

    // 파일 크기 제한
    if (file.size > maxSize) {
      toast.error(`파일 크기는 ${maxSize / (1024 * 1024)}MB 이하여야 합니다.`);
      return false;
    }

    // 이미지 해상도 확인 (비동기)
    return new Promise((resolve) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.width < 720 || img.height < 960) {
          toast.error('이미지 해상도는 최소 720 x 960px 이상이어야 합니다.');
          resolve(false);
        }
        else {
          resolve(true);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        toast.error('이미지를 읽을 수 없습니다.');
        resolve(false);
      };

      img.src = url;
    });
  }, [maxSize]);

  // 파일 처리
  const handleFile = useCallback(
    async (file: File) => {
      const isValid = await validateFile(file);
      if (!isValid) {
        return;
      }

      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileChange(file);
    },
    [onFileChange, validateFile],
  );

  // 파일 선택 창 열기
  const handleClick = () => {
    if (disabled) {
      return;
    }

    fileInputRef.current?.click();
  };

  // 파일 선택 시
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // 드래그 앤 드롭 이벤트
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    if (disabled) {
      return;
    }

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  // 이미지 제거
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreviewUrl(null);
    onFileChange(null);

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
        aria-label="이미지 파일 선택"
      />

      {/* 업로드 영역 */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        aria-label="이미지 업로드"
        className={cn(
          `
            relative cursor-pointer rounded-lg bg-gray-100 transition-all
            duration-200 outline-none
            focus-visible:ring-2 focus-visible:ring-purple-600
            focus-visible:ring-offset-2
          `,
          height,
          {
            'bg-gray-300': isDragOver && !disabled,
            'border-error': error,
            'cursor-not-allowed opacity-50': disabled,
            'hover:bg-gray-200 active:bg-gray-300': !disabled && !error && !isDragOver,
          },
        )}
      >
        {previewUrl
          ? (
              // 미리보기 이미지
              <div className={`
                group relative size-full overflow-hidden rounded-lg
              `}
              >
                {/* 미리보기 이미지: Cover 방식 (추후 크롭 기능 추가 예정) */}
                <Image
                  src={previewUrl}
                  alt="업로드된 이미지"
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* 호버 오버레이 & 삭제 버튼 */}
                {!disabled && (
                  <div className={`
                    absolute inset-0 flex items-center justify-center
                    bg-black/50 opacity-0 transition-opacity duration-200
                    group-focus-within:opacity-100
                    group-hover:opacity-100
                  `}
                  >
                    <button
                      onClick={handleRemove}
                      className={`
                        flex h-8.75 items-center justify-center rounded-full
                        bg-error px-7.5 typo-body-m-3 text-white
                        transition-transform
                        hover:scale-105
                        active:scale-95
                      `}
                      type="button"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )
          : (
              // 업로드 영역
              <div className={`
                flex size-full flex-col items-center justify-center gap-2.5 p-5
              `}
              >
                {/* 업로드 아이콘 */}
                <Image
                  src="/icons/uploadImg-gray.svg"
                  alt="이미지 업로드 아이콘"
                  width={24}
                  height={24}
                  unoptimized
                />

                {/* 안내 텍스트 */}
                <span className="typo-caption-r-1 text-gray-550">
                  IMAGE UPLOAD
                </span>
              </div>
            )}
      </div>
    </div>
  );
}

export { ImageUpload };
