import { parseCertificateAlias } from "@entities/organization";
import { Certificate } from "@shared/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import { ChevronDown, Key } from "lucide-react";
import React, { useState } from "react";
import { CertificateItem } from "./ui";

interface CertificateSelectProps {
  certificates: Certificate[];
  selectedCertificate?: Certificate | null;
  onSelect: (certificate: Certificate) => void;
  loading?: boolean;
  error?: string;
  errorText?: string;
  placeholder?: string;
  loadingText?: string;
  notFoundText?: string;
  className?: string;
  disabled?: boolean;
  classNameTrigger?: string;
}

export const CertificateSelect: React.FC<CertificateSelectProps> = ({
  certificates,
  selectedCertificate,
  onSelect,
  loading = false,
  error,
  placeholder = "Выберите сертификат...",
  loadingText = "Загрузка сертификатов...",
  notFoundText = "Сертификаты не найдены",
  errorText = "Ошибка при загрузке сертификатов",
  className = "",
  disabled = false,
  classNameTrigger = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCertificateSelect = (cert: Certificate) => {
    onSelect(cert);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!selectedCertificate) return placeholder;
    const info = parseCertificateAlias(selectedCertificate.alias);
    const fio = info.organization.toUpperCase() || info.cn.toUpperCase();
    const pnfl = info.pnfl;
    const uid = info.uid;
    return (
      <p className="grid items-center grid-flow-col gap-3">
        <span className="font-semibold text-[#4d37b3] truncate">{fio}</span>
        {pnfl && !info.organization && (
          <span className="px-2 bg-white border rounded-xl border-2-gray-200">
            {pnfl}
          </span>
        )}
        {uid && !!info.organization && (
          <span className="px-2 bg-white border rounded-xl border-2-gray-200">
            {uid}
          </span>
        )}
      </p>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={`
              w-full p-4 bg-[var(--Personal-colors-White)] 
              focus:ring-2 focus:ring-[#4d37b3] focus:border-transparent 
              transition-all duration-200 outline-none backdrop-blur-sm 
              flex items-center justify-between rounded-lg border-2 border-gray-200
              ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${error ? "border-red-300 bg-red-50/50" : ""}
              ${isOpen ? "ring-2 ring-[#4d37b3] border-transparent" : ""}
              ${classNameTrigger}
            `}
          >
            <div className="flex items-center flex-1">
              <span
                className={`truncate text-sm ${selectedCertificate ? "text-[var(--Personal-colors-black)]" : "text-gray-500"}`}
              >
                {loading ? loadingText : getDisplayText()}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-80 p-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
          align="start"
          sideOffset={8}
        >
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="w-6 h-6 mx-auto mb-2 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
              <p>{loadingText}</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Key className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>{notFoundText}</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-40 scroll">
              {certificates.map((cert, index) => {
                const info = parseCertificateAlias(cert?.alias);
                const isSelected = selectedCertificate?.name === cert?.name;

                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleCertificateSelect(cert)}
                    className={`
                      p-4 cursor-pointer focus:bg-blue-50 hover:bg-blue-50 hover:rounded-lg
                      ${isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
                      ${index !== certificates.length - 1 ? "border-b border-gray-100" : ""}
                    `}
                  >
                    <CertificateItem info={info} isSelected={isSelected} />
                  </DropdownMenuItem>
                );
              })}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Ошибка */}
      {error && (
        <p className="flex items-center mt-2 text-sm text-red-600">
          <span className="flex items-center justify-center w-4 h-4 mr-2 text-xs bg-red-100 rounded-full">
            !
          </span>
          {errorText || error}
        </p>
      )}
    </div>
  );
};
