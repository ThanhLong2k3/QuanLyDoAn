﻿using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface  INhomQuyenPhanQuyenRepository
    {
        public List<NhomQuyenPhanQuyen_DTO> GETPHANQUYENBYTAIKHOAN(string taiKhoan);

        string Create(NhomQuyenPhanQuyen_DTO model);

        bool Delete(NhomQuyenPhanQuyen_DTO model);
    }
}
