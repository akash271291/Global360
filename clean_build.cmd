@echo off
REM Clean and rebuild Todo-backend project

cd Todo-backend

echo Deleting bin and obj folders...
rd /s /q bin
rd /s /q obj

echo Deleting AssemblyInfo.cs files...
del /s /q *.AssemblyInfo.cs
del /s /q Properties\AssemblyInfo.cs

echo Restoring and building project...
dotnet restore
dotnet build

echo Done.
pause