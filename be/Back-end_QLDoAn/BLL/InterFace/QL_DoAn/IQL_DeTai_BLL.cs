﻿using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public interface IQL_DeTai_BLL
    {
        public List<QL_DeTaiDTO> GetAll();
        string Create(QL_DeTaiDTO model, string taikhoan);
        string Update(QL_DeTaiDTO model, string taikhoan);
        string Delete(int maDeTai, string taikhoan);
    }
}