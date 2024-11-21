import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { FormInstance } from 'antd/lib/form';

export interface DuLieuItem {
  key: number;
  [key: string]: any;
}

interface UseQuanLyDuLieuProps<T extends DuLieuItem> {
  duLieuBanDau: T[];
  khoaLuuTru: string;
  bienForm?: FormInstance;
}

export function useQuanLyDuLieu<T extends DuLieuItem>({
  duLieuBanDau,
  khoaLuuTru,
  bienForm,
}: UseQuanLyDuLieuProps<T>) {
  const [duLieu, setDuLieu] = useState<T[]>(duLieuBanDau);
  const [hienModal, setHienModal] = useState<boolean>(false);
  const [form] = Form.useForm(bienForm);
  const [keyDangSua, setKeyDangSua] = useState<number | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);

  useEffect(() => {
    const duLieuLuuTru = localStorage.getItem(khoaLuuTru);
    if (duLieuLuuTru) {
      setDuLieu(JSON.parse(duLieuLuuTru));
    }
  }, [khoaLuuTru]);

  useEffect(() => {
    localStorage.setItem(khoaLuuTru, JSON.stringify(duLieu));
  }, [duLieu, khoaLuuTru]);

  const hienThiModal = (banGhi?: T) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.key);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  const xuLyDongY = () => {
    form.validateFields().then((giaTri) => {
      if (keyDangSua !== null) {
        setDuLieu((duLieuCu) =>
          duLieuCu.map((item) =>
            item.key === keyDangSua ? { ...item, ...giaTri } : item
          )
        );
      } else {
        console.log(giaTri);
        const duLieuMoi: T = {
          key: Date.now(),
          ...giaTri,
        };
        setDuLieu((duLieuCu) => [...duLieuCu, duLieuMoi]);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
      message.success("Dữ liệu đã được lưu thành công!");
    });
  };

  const xuLyXoa = (key: number) => {
    setDuLieu((duLieuCu) => duLieuCu.filter((item) => item.key !== key));
    message.success("Dữ liệu đã được xóa thành công!");
  };

  const xuLyXoaNhieu = () => {
    setDuLieu((duLieuCu) =>
      duLieuCu.filter((item) => !cacDongDaChon.includes(item.key))
    );
    setCacDongDaChon([]);
    message.success(`${cacDongDaChon.length} mục đã được xóa thành công!`);
  };

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  return {
    duLieu,
    setDuLieu,
    hienModal,
    setHienModal,
    form,
    keyDangSua,
    cacDongDaChon,
    hienThiModal,
    xuLyDongY,
    xuLyXoa,
    xuLyXoaNhieu,
    chonDong,
  };
}