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
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showDetails?: boolean;
}

export const CertificateSelect: React.FC<CertificateSelectProps> = ({
  certificates,
  selectedCertificate,
  onSelect,
  loading = false,
  error,
  placeholder = "Выберите сертификат...",
  className = "",
  disabled = false,
  showDetails = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCertificateSelect = (cert: Certificate) => {
    onSelect(cert);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!selectedCertificate) return placeholder;
    const info = parseCertificateAlias(selectedCertificate.alias);
    return `${info.cn.toUpperCase()} - ${info.pnfl}`;
  };

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={`
              w-full px-4 py-2 bg-[var(--Personal-colors-White)] border border-[var(--Inside-container)] rounded-xl 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all duration-200 outline-none backdrop-blur-sm 
              flex items-center justify-between
              ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${error ? "border-red-300 bg-red-50/50" : ""}
              ${isOpen ? "ring-2 ring-blue-500 border-transparent" : ""}
            `}
          >
            <div className="flex items-center flex-1">
              <Key className="flex-shrink-0 w-5 h-5 mr-3 text-gray-400" />
              <span
                className={`truncate ${selectedCertificate ? "text-[var(--Personal-colors-black)]" : "text-gray-500"}`}
              >
                {loading ? "Загрузка сертификатов..." : getDisplayText()}
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
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-80 p-0 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
          align="start"
          sideOffset={8}
        >
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="w-6 h-6 mx-auto mb-2 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
              <p>Загрузка сертификатов...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Key className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Сертификаты не найдены</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-80">
              {certificates.map((cert, index) => {
                const info = parseCertificateAlias(cert.alias);
                const isSelected = selectedCertificate?.name === cert.name;

                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleCertificateSelect(cert)}
                    className={`
                      p-4 cursor-pointer focus:bg-blue-50 hover:bg-blue-50
                      ${isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
                      ${index !== certificates.length - 1 ? "border-b border-gray-100" : ""}
                    `}
                  >
                    <CertificateItem
                      info={info}
                      isSelected={isSelected}
                      showDetails={showDetails}
                    />
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
          {error}
        </p>
      )}
    </div>
  );
};
