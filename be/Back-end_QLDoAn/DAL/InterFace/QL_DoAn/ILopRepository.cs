﻿using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface  ILopRepository
    {
        public List<LopDTO> GetAll();
        string Create(LopDTO model, string taikhoan);
        bool Update(LopDTO model, string taikhoan);
        bool Delete(string malop, string taikhoan);
    }
}