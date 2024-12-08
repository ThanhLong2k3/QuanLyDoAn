using BLL.InterFace.QL_DanhMuc;
using BLL.InterFace.QL_DoAn;
using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using BLL.InterFace.QL_HeThong;
using BLL.QL_DanhMuc;
using BLL.QL_HeThong;
using BLL.QL_NguoiDung;
using BLL.QL_NguoiDung.QL_DotLamDoAn;
using DAL;
using DAL.InterFace.QL_DanhMuc;
using DAL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DAL.InterFace.QL_DoAn.IHoiDongRepository;
using DAL.InterFace.QL_HeThong;
using DAL.QL_DanhMuc;
using DAL.QL_DanhMucRepository;
using DAL.QL_DoAnRepository;
using DAL.QL_DoAnRepository.QL_DotLamDoAnRepository;
using DAL.QL_DoAnRepository.QL_HoiDongRepository;
using DAL.QL_HethongRepository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.WithOrigins("*")
           .AllowAnyMethod()
           .AllowAnyHeader();

    // U Can Filter Here
}));

// Add services to the container.
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<INguoiDungRepository, nguoiDungRepository>();
builder.Services.AddTransient<INguoiDung_BLL, nguoiDung_BLL>();
builder.Services.AddTransient<INhomQuyenRepository, nhomQuyenRepository>();
builder.Services.AddTransient<INhomQuyen_BLL, nhomQuyen_BLL>();
builder.Services.AddTransient<InguoiDung_nhomQuyenRepository, nguoiDung_NhomQuyenReposiory>();
builder.Services.AddTransient<INguoiDung_NhomQuyen_BLL, NguoiDung_NhomQuyen_BLL>();
builder.Services.AddTransient<ILopRepository, LopRepository>();
builder.Services.AddTransient<ILop_BLL, Lop_BLL>();
builder.Services.AddTransient<ISinhVienRepository, SinhVienRepository>();
builder.Services.AddTransient<ISinhVien_BLL, SinhVien_BLL>();
builder.Services.AddTransient<IGiangVienReposirooty, GiangVienRepository>();
builder.Services.AddTransient<IGiangVien_BLL, GiangVien_BLL>();
builder.Services.AddTransient<INhomQuyenPhanQuyenRepository, NhomQuyenPhanQuyenRepository>();
builder.Services.AddTransient<InhomQuyen_PhanQuyen_BLL, nhomQuyen_PhanQuyen_BLL>();
builder.Services.AddTransient<IPhanQuyenRepository, phanQuyenRepository>();
builder.Services.AddTransient<IPhanQuyen_BLL, phanQuyen_BLL>();

builder.Services.AddTransient<IKhoaRepository, KhoaRepository>();
builder.Services.AddTransient<IKhoa_BLL, Khoa_BLL>();

builder.Services.AddTransient<IChucVuRepository, ChucVuRepository>();
builder.Services.AddTransient<IChucVu_BLL, ChucVu_BLL>();

builder.Services.AddTransient<IBoMonRepository, BoMonRepository>();
builder.Services.AddTransient<IBoMon_BLL, BoMon_BLL>();

builder.Services.AddTransient<IHocViRepository, HocViRepository>();
builder.Services.AddTransient<IHocVi_BLL, HocVi_BLL>();


builder.Services.AddTransient<IHocHamReponsitory,HocHamReponsitory>();
builder.Services.AddTransient<IHocHam_BLL, HocHam_BLL>();


builder.Services.AddTransient<IDotLmaDoAnRepository, DotLamDoAnRepository>();
builder.Services.AddTransient<IDotLamDoAn_BLL, DotLamDoAn_BLL>();


builder.Services.AddTransient<IHoiDongReponsitory, HoiDongReponsitory>();
builder.Services.AddTransient<IHoiDong_BLL, HoiDong_BLL>();


builder.Services.AddTransient<IDot_GiangVienReponsitory, Dot_GiangVienReponsitory>();
builder.Services.AddTransient<IDot_GiangVien_BLL, Dot_GiangVien_BLL>();


builder.Services.AddTransient<IDot_SinhVienRepository,Dot_SinhVienRepository>();
builder.Services.AddTransient<IDot_SinhVien_BLL, Dot_SinhVien_BLL>();

builder.Services.AddTransient<IPhanCongHuongDanRepository, PhanCongHuongDanRepository>();
builder.Services.AddTransient<IPhanCongHuongDan_BLL, PhanCongHuongDan_BLL>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("MyPolicy");

app.MapControllers();

app.Run();
