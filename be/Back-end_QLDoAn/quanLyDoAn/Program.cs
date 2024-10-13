using BLL.InterFace.QL_HeThong;
using BLL.QL_HeThong;
using DAL;
using DAL.InterFace.QL_HeThong;
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
