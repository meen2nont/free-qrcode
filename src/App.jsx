import React, { useState, useEffect, useRef } from 'react';
import {
    Download, Link, Type, Wifi, Palette, Share2,
    Check, Image as ImageIcon, Upload, Frame,
    Home, User, Sparkles,
    Move, Maximize, Layout, Sliders, Globe
} from 'lucide-react';

const translations = {
    th: {
        title: 'QR Studio',
        saveBtn: 'บันทึกรูปภาพ',
        tabUrl: 'ลิงก์',
        tabText: 'ข้อความ',
        tabWifi: 'WiFi',
        urlPlaceholder: 'https://www.example.com',
        textPlaceholder: 'พิมพ์ข้อความ...',
        ssidPlaceholder: 'ชื่อ WiFi (SSID)',
        passPlaceholder: 'รหัสผ่าน',
        noPass: 'ไม่มีรหัสผ่าน',
        step1: 'ข้อมูล QR Code',
        step2: 'ดีไซน์ & พื้นหลัง',
        step3: 'จัดวางตำแหน่ง',
        step4: 'โลโก้',
        colorQr: 'สี QR Code',
        bgCard: 'พื้นหลังการ์ด (Card Background)',
        colorBg: 'สีพื้นหลัง',
        orImage: 'หรือ รูปภาพ',
        upload: 'อัปโหลด',
        changeImg: 'เปลี่ยนรูป',
        remove: 'ลบ',
        dragHint: 'ทริค: คลิกลากที่รูปตัวอย่างเพื่อปรับตำแหน่ง',
        size: 'ขนาด (Size)',
        dragQrHint: 'ทริค: ลากที่ QR Code เพื่อเเปลี่ยนตำแหน่ง',
        frameStyle: 'Frame Style',
        livePreview: 'Live Preview',
        processing: 'กำลังประมวลผล...',
        downloadHq: 'ดาวน์โหลดรูปภาพ (HQ)',
        scanMe: 'SCAN ME',
        loaded: 'Loaded'
    },
    en: {
        title: 'QR Studio',
        saveBtn: 'Save Image',
        tabUrl: 'URL',
        tabText: 'Text',
        tabWifi: 'WiFi',
        urlPlaceholder: 'https://www.example.com',
        textPlaceholder: 'Enter text...',
        ssidPlaceholder: 'WiFi Name (SSID)',
        passPlaceholder: 'Password',
        noPass: 'No Password',
        step1: 'QR Data',
        step2: 'Design & Background',
        step3: 'Layout & Position',
        step4: 'Logo',
        colorQr: 'QR Color',
        bgCard: 'Card Background',
        colorBg: 'Background Color',
        orImage: 'Or Image',
        upload: 'Upload',
        changeImg: 'Change',
        remove: 'Remove',
        dragHint: 'Tip: Drag on preview to adjust position',
        size: 'Size',
        dragQrHint: 'Tip: Drag QR Code to move',
        frameStyle: 'Frame Style',
        livePreview: 'Live Preview',
        processing: 'Processing...',
        downloadHq: 'Download (HQ)',
        scanMe: 'SCAN ME',
        loaded: 'Loaded'
    }
};

const LOGO_ASSETS = {
    facebook: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MDkgNTA5Ij48ZyBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGZpbGw9IiMwODY2RkYiIGQ9Ik01MDkgMjU0LjVDNTA5IDExMy45NCAzOTUuMDYgMCAyNTQuNSAwUzAgMTEzLjk0IDAgMjU0LjVDMCAzNzMuODYgODIuMTcgNDc0IDE5My4wMiA1MDEuNTFWMzMyLjI3aC01Mi40OFYyNTQuNWg1Mi40OHYtMzMuNTFjMC04Ni42MyAzOS4yLTEyNi43OCAxMjQuMjQtMTI2Ljc4IDE2LjEzIDAgNDMuOTUgMy4xNyA1NS4zMyA2LjMzdjcwLjVjLTYuMDEtLjYzLTE2LjQ0LS45NS0yOS40LS45NS00MS43MyAwLTU3Ljg2IDE1LjgxLTU3Ljg2IDU2LjkxdjI3LjVoODMuMTNsLTE0LjI4IDc3Ljc3aC02OC44NXYxNzQuODdDNDExLjM1IDQ5MS45MiA1MDkgMzg0LjYyIDUwOSAyNTQuNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzU0LjE4IDMzMi4yN2wxNC4yOC03Ny43N2gtODMuMTNWMjI3YzAtNDEuMSAxNi4xMy01Ni45MSA1Ny44Ni01Ni45MSAxMi45NiAwIDIzLjM5LjMyIDI5LjQuOTV2LTcwLjVjLTExLjM4LTMuMTYtMzkuMi02LjMzLTU1LjMzLTYuMzMtODUuMDQgMC0xMjQuMjQgNDAuMTYtMTI0LjI0IDEyNi43OHYzMy41MWgtNTIuNDh2NzcuNzdoNTIuNDh2MTY5LjI0YzE5LjY5IDQuODggNDAuMjggNy40OSA2MS40OCA3LjQ5IDEwLjQ0IDAgMjAuNzItLjY0IDMwLjgzLTEuODZWMzMyLjI3aDY4Ljg1eiIvPjwvZz48L3N2Zz4=',
    instagram: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTMyLjAwNCAxMzIiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzc3MWM4Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzM3NzFjOCIgb2Zmc2V0PSIuMTI4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjBmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmQ1Ii8+PHN0b3Agb2Zmc2V0PSIuMSIgc3RvcC1jb2xvcj0iI2ZkNSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiNmZjU0M2UiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNjODM3YWIiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjE1OC40MjkiIGN5PSI1NzguMDg4IiByPSI2NSIgeGxpbms6aHJlZj0iI2EiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgLTEuOTgxOTggMS44NDM5IDAgLTEwMzEuNDAyIDQ1NC4wMDQpIiBmeD0iMTU4LjQyOSIgZnk9IjU3OC4wODgiLz48cmFkaWFsR3JhZGllbnQgaWQ9ImQiIGN4PSIxNDcuNjk0IiBjeT0iNDczLjQ1NSIgcj0iNjUiIHhsaW5rOmhyZWY9IiNiIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMTczOTQgLjg2ODcyIC0zLjU4MTggLjcxNzE4IDE2NDguMzQ4IC00NTguNDkzKSIgZng9IjE0Ny42OTQiIGZ5PSI0NzMuNDU1Ii8+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik02NS4wMyAwQzM3Ljg4OCAwIDI5Ljk1LjAyOCAyOC40MDcuMTU2Yy01LjU3LjQ2My05LjAzNiAxLjM0LTEyLjgxMiAzLjIyLTIuOTEgMS40NDUtNS4yMDUgMy4xMi03LjQ3IDUuNDY4QzQgMTMuMTI2IDEuNSAxOC4zOTQuNTk1IDI0LjY1NmMtLjQ0IDMuMDQtLjU2OCAzLjY2LS41OTQgMTkuMTg4LS4wMSA1LjE3NiAwIDExLjk4OCAwIDIxLjEyNSAwIDI3LjEyLjAzIDM1LjA1LjE2IDM2LjU5LjQ1IDUuNDIgMS4zIDguODMgMy4xIDEyLjU2IDMuNDQgNy4xNCAxMC4wMSAxMi41IDE3Ljc1IDE0LjUgMi42OC42OSA1LjY0IDEuMDcgOS40NCAxLjI1IDEuNjEuMDcgMTguMDIuMTIgMzQuNDQuMTIgMTYuNDIgMCAzMi44NC0uMDIgMzQuNDEtLjEgNC40LS4yMDcgNi45NTUtLjU1IDkuNzgtMS4yOCA3Ljc5LTIuMDEgMTQuMjQtNy4yOSAxNy43NS0xNC41MyAxLjc2NS0zLjY0IDIuNjYtNy4xOCAzLjA2NS0xMi4zMTcuMDg4LTEuMTIuMTI1LTE4Ljk3Ny4xMjUtMzYuODEgMC0xNy44MzYtLjA0LTM1LjY2LS4xMjgtMzYuNzgtLjQxLTUuMjItMS4zMDUtOC43My0zLjEyNy0xMi40NC0xLjQ5NS0zLjAzNy0zLjE1NS01LjMwNS01LjU2NS03LjYyNEMxMTYuOSA0IDExMS42NCAxLjUgMTA1LjM3Mi41OTYgMTAyLjMzNS4xNTcgMTAxLjczLjAyNyA4Ni4xOSAwSDY1LjAzeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDQgMSkiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBkPSJNNjUuMDMgMEMzNy44ODggMCAyOS45NS4wMjggMjguNDA3LjE1NmMtNS41Ny40NjMtOS4wMzYgMS4zNC0xMi44MTIgMy4yMi0yLjkxIDEuNDQ1LTUuMjA1IDMuMTItNy40NyA1LjQ2OEM0IDEzLjEyNiAxLjUgMTguMzk0LjU5NSAyNC42NTZjLS40NCAzLjA0LS41NjggMy42Ni0uNTk0IDE5LjE4OC0uMDEgNS4xNzYgMCAxMS45ODggMCAyMS4xMjUgMCAyNy4xMi4wMyAzNS4wNS4xNiAzNi41OS40NSA1LjQyIDEuMyA4LjgzIDMuMSAxMi41NiAzLjQ0IDcuMTQgMTAuMDEgMTIuNSAxNy43NSAxNC41IDIuNjguNjkgNS42NCAxLjA3IDkuNDQgMS4yNSAxLjYxLjA3IDE4LjAyLjEyIDM0LjQ0LjEyIDE2LjQyIDAgMzIuODQtLjAyIDM0LjQxLS4xIDQuNC0uMjA3IDYuOTU1LS41NSA5Ljc4LTEuMjggNy43OS0yLjAxIDE0LjI0LTcuMjkgMTcuNzUtMTQuNTMgMS43NjUtMy42NCAyLjY2LTcuMTggMy4wNjUtMTIuMzE3LjA4OC0xLjEyLjEyNS0xOC45NzcuMTI1LTM2LjgxIDAtMTcuODM2LS4wNC0zNS42Ni0uMTI4LTM2Ljc4LS40MS01LjIyLTEuMzA1LTguNzMtMy4xMjctMTIuNDQtMS40OTUtMy4wMzctMy4xNTUtNS4zMDUtNS41NjUtNy42MjRDMTE2LjkgNCAxMTEuNjQgMS41IDEwNS4zNzIuNTk2IDEwMi4zMzUuMTU3IDEwMS43My4wMjcgODYuMTkgMEg2NS4wM3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDA0IDEpIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY2LjAwNCAxOGMtMTMuMDM2IDAtMTQuNjcyLjA1Ny0xOS43OTIuMjktNS4xMS4yMzQtOC41OTggMS4wNDMtMTEuNjUgMi4yMy0zLjE1NyAxLjIyNi01LjgzNSAyLjg2Ni04LjUwMyA1LjUzNS0yLjY3IDIuNjY4LTQuMzEgNS4zNDYtNS41NCA4LjUwMi0xLjE5IDMuMDUzLTIgNi41NDItMi4yMyAxMS42NUMxOC4wNiA1MS4zMjcgMTggNTIuOTY0IDE4IDY2cy4wNTggMTQuNjY3LjI5IDE5Ljc4N2MuMjM1IDUuMTEgMS4wNDQgOC41OTggMi4yMyAxMS42NSAxLjIyNyAzLjE1NyAyLjg2NyA1LjgzNSA1LjUzNiA4LjUwMyAyLjY2NyAyLjY3IDUuMzQ1IDQuMzE0IDguNSA1LjU0IDMuMDU0IDEuMTg3IDYuNTQzIDEuOTk2IDExLjY1MiAyLjIzIDUuMTIuMjMzIDYuNzU1LjI5IDE5Ljc5LjI5IDEzLjAzNyAwIDE0LjY2OC0uMDU3IDE5Ljc4OC0uMjkgNS4xMS0uMjM0IDguNjAyLTEuMDQzIDExLjY1Ni0yLjIzIDMuMTU2LTEuMjI2IDUuODMtMi44NyA4LjQ5Ny01LjU0IDIuNjctMi42NjggNC4zMS01LjM0NiA1LjU0LTguNTAyIDEuMTgtMy4wNTMgMS45OS02LjU0MiAyLjIzLTExLjY1LjIzLTUuMTIuMjktNi43NTIuMjktMTkuNzg4IDAtMTMuMDM2LS4wNi0xNC42NzItLjI5LTE5Ljc5Mi0uMjQtNS4xMS0xLjA1LTguNTk4LTIuMjMtMTEuNjUtMS4yMy0zLjE1Ny0yLjg3LTUuODM1LTUuNTQtOC41MDMtMi42Ny0yLjY3LTUuMzQtNC4zMS04LjUtNS41MzUtMy4wNi0xLjE4Ny02LjU1LTEuOTk2LTExLjY2LTIuMjMtNS4xMi0uMjMzLTYuNzUtLjI5LTE5Ljc5LS4yOXptLTQuMzA2IDguNjVjMS4yNzgtLjAwMiAyLjcwNCAwIDQuMzA2IDAgMTIuODE2IDAgMTQuMzM1LjA0NiAxOS4zOTYuMjc2IDQuNjguMjE0IDcuMjIuOTk2IDguOTEyIDEuNjUzIDIuMjQuODcgMy44MzcgMS45MSA1LjUxNiAzLjU5IDEuNjggMS42OCAyLjcyIDMuMjggMy41OTIgNS41Mi42NTcgMS42OSAxLjQ0IDQuMjMgMS42NTMgOC45MS4yMyA1LjA2LjI4IDYuNTguMjggMTkuMzlzLS4wNSAxNC4zMy0uMjggMTkuMzljLS4yMTQgNC42OC0uOTk2IDcuMjItMS42NTMgOC45MS0uODcgMi4yNC0xLjkxMiAzLjgzNS0zLjU5MiA1LjUxNC0xLjY4IDEuNjgtMy4yNzUgMi43Mi01LjUxNiAzLjU5LTEuNjkuNjYtNC4yMzIgMS40NC04LjkxMiAxLjY1NC01LjA2LjIzLTYuNTguMjgtMTkuMzk2LjI4LTEyLjgxNyAwLTE0LjMzNi0uMDUtMTkuMzk2LS4yOC00LjY4LS4yMTYtNy4yMi0uOTk4LTguOTEzLTEuNjU1LTIuMjQtLjg3LTMuODQtMS45MS01LjUyLTMuNTktMS42OC0xLjY4LTIuNzItMy4yNzYtMy41OTItNS41MTctLjY1Ny0xLjY5LTEuNDQtNC4yMy0xLjY1My04LjkxLS4yMy01LjA2LS4yNzYtNi41OC0uMjc2LTE5LjM5OHMuMDQ2LTE0LjMzLjI3Ni0xOS4zOWMuMjE0LTQuNjguOTk2LTcuMjIgMS42NTMtOC45MTIuODctMi4yNCAxLjkxMi0zLjg0IDMuNTkyLTUuNTIgMS42OC0xLjY4IDMuMjgtMi43MiA1LjUyLTMuNTkyIDEuNjkyLS42NiA0LjIzMy0xLjQ0IDguOTEzLTEuNjU1IDQuNDI4LS4yIDYuMTQ0LS4yNiAxNS4wOS0uMjd6bTI5LjkyOCA3Ljk3Yy0zLjE4IDAtNS43NiAyLjU3Ny01Ljc2IDUuNzU4IDAgMy4xOCAyLjU4IDUuNzYgNS43NiA1Ljc2IDMuMTggMCA1Ljc2LTIuNTggNS43Ni01Ljc2IDAtMy4xOC0yLjU4LTUuNzYtNS43Ni01Ljc2em0tMjUuNjIyIDYuNzNjLTEzLjYxMyAwLTI0LjY1IDExLjAzNy0yNC42NSAyNC42NSAwIDEzLjYxMyAxMS4wMzcgMjQuNjQ1IDI0LjY1IDI0LjY0NUM3OS42MTcgOTAuNjQ1IDkwLjY1IDc5LjYxMyA5MC42NSA2NlM3OS42MTYgNDEuMzUgNjYuMDAzIDQxLjM1em0wIDguNjVjOC44MzYgMCAxNiA3LjE2MyAxNiAxNiAwIDguODM2LTcuMTY0IDE2LTE2IDE2LTguODM3IDAtMTYtNy4xNjQtMTYtMTYgMC04LjgzNyA3LjE2My0xNiAxNi0xNnoiLz48L3N2Zz4=',
    line: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPjxwYXRoIGQ9Ik01MDYgMTAyLjE4NnYzMDcuNjI4QzUwNiA0NjIuOSA0NjIuOSA1MDYgNDA5LjgxNCA1MDZIMTAyLjE4NkM0OS4xIDUwNiA2IDQ2Mi45IDYgNDA5LjgxNFYxMDIuMTg2QzYgNDkuMSA0OS4xIDYgMTAyLjE4NiA2aDMwNy42MjhDNDYyLjkgNiA1MDYgNDkuMSA1MDYgMTAyLjE4NnoiIGZpbGw9IiMwNmM3NTUiLz48cGF0aCBkPSJNNDIyLjY1NiAyMzIuNDM3YzAtNzQuNTkzLTc0Ljc4MS0xMzUuMjgtMTY2LjcwMy0xMzUuMjhTODkuMjUgMTU3Ljg0MyA4OS4yNSAyMzIuNDM2YzAgNjYuODc1IDU5LjM3NSAxMjIuODkxIDEzOS40MDYgMTMzLjQ3IDUuNDM4IDEuMTcxIDEyLjgyOCAzLjU3NyAxNC42ODggOC4yMTggMS42ODcgNC4yMTkgMS4xMSAxMC44MjguNTQ3IDE1LjA3OCAwIDAtMS45NTMgMTEuNzY2LTIuMzc1IDE0LjI2Ni0uNzM1IDQuMjE4LTMuMzYgMTYuNDg0IDE0LjQzNyA5IDE3Ljc5Ny03LjQ4NSA5Ni01Ni41MzEgMTMwLjk2OS05Ni43OTcgMjQuMTU2LTI2LjQ4NSAzNS43MzQtNTMuNDIyIDM1LjczNC04My4yMzV6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNMzY3LjE4OCAyNzUuNTE2aC00Ni44NzVhMy4xNCAzLjE0IDAgMDEtMy4xMjUtMy4xMjV2LTcyLjczNWEzLjE0IDMuMTQgMCAwMTMuMTI1LTMuMTI1aDQ2Ljg3NWEzLjE0IDMuMTQgMCAwMTMuMTI1IDMuMTI1djExLjgyOGEzLjE0IDMuMTQgMCAwMS0zLjEyNSAzLjEyNWgtMzEuODI5djEyLjI2NmgzMS44MjlhMy4xNCAzLjE0IDAgMDEzLjEyNSAzLjEyNXYxMS45MzhhMy4xNCAzLjE0IDAgMDEtMy4xMjUgMy4xMjVoLTMxLjgyOXYxMi4yOGgzMS44MjlhMy4xNCAzLjE0IDAgMDEzLjEyNSAzLjEyNnYxMS44MTJsLjAwMS4xMWEzLjE0IDMuMTQgMCAwMS0zLjEyNSAzLjEyNWgtLjAwMXpNMTkzLjk1MyAyNzUuNTE2YTMuMTQgMy4xNCAwIDAwMy4xMjUtMy4xMjV2LTExLjgxM2EzLjE0IDMuMTQgMCAwMC0zLjEyNS0zLjEyNWgtMzEuODI4di01Ny44MTJhMy4xNCAzLjE0IDAgMDAtMy4xMjUtMy4xMjVoLTExLjg3NUEzLjE0IDMuMTQgMCAwMDE0NCAxOTkuNjR2NzIuNzAzYTMuMTQgMy4xNCAwIDAwMy4xMjUgMy4xMjVIMTk0bC0uMDQ3LjA0N3oiIGZpbGw9IiMwNmM3NTUiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik0yMjUuMzI4IDE5OS4xMXY3My42ODVhMi43MjEgMi43MjEgMCAwMS0yLjcyIDIuNzJIMjA5Ljg2YTIuNzIxIDIuNzIxIDAgMDEtMi43Mi0yLjcydi03My42ODRhMi43MjEgMi43MjEgMCAwMTIuNzItMi43MmgxMi43NDdhMi43MjEgMi43MjEgMCAwMTIuNzIgMi43MnoiIGZpbGw9IiMwNmM3NTUiLz48cGF0aCBkPSJNMzAyLjYyNSAxOTYuMzloLTExLjgxM2EzLjE0IDMuMTQgMCAwMC0zLjEyNSAzLjEyNnY0My4yMThsLTMzLjI4LTQ0Ljk1M2ExLjkyMiAxLjkyMiAwIDAwLS4yNjYtLjMyOGwtLjE4OC0uMTg3LS4xNzItLjE0MWgtLjA5M2wtLjE3Mi0uMTI1aC0uMDk0bC0uMTcyLS4wOTRoLTEzLjIzNGEzLjE0IDMuMTQgMCAwMC0zLjEyNSAzLjEyNXY3Mi43NWEzLjE0IDMuMTQgMCAwMDMuMTI1IDMuMTI1aDExLjgyOGEzLjE0IDMuMTQgMCAwMDMuMTI1LTMuMTI1di00My42NGwzMy4zMjggNDVjLjIxOS4zMTguNDk0LjU5My44MTIuODEybC4xODguMTI1aC4wOTRsLjE1Ni4wNzhoLjQ4NGMuMjc3LjA2OS41Ni4xMDUuODQ0LjExaDExLjc1YTMuMTQgMy4xNCAwIDAwMy4xMjUtMy4xMjV2LTcyLjU2My0uMDYyYTMuMTQgMy4xNCAwIDAwLTMuMTI1LTMuMTI1eiIgZmlsbD0iIzA2Yzc1NSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+',
    telegram: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InByZWZpeF9fYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNTYiIHkxPSIzLjg0IiB4Mj0iMjU2IiB5Mj0iNTEyIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyQUFCRUUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyMjlFRDkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGZpbGw9InVybCgjcHJlZml4X19hKSIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTExNS44OCAyNTMuM2M3NC42My0zMi41MiAxMjQuMzktNTMuOTUgMTQ5LjI5LTY0LjMxIDcxLjEtMjkuNTcgODUuODctMzQuNzEgOTUuNS0zNC44OCAyLjEyLS4wMyA2Ljg1LjQ5IDkuOTIgMi45OCAyLjU5IDIuMSAzLjMgNC45NCAzLjY0IDYuOTMuMzQgMiAuNzcgNi41My40MyAxMC4wOC0zLjg1IDQwLjQ4LTIwLjUyIDEzOC43MS0yOSAxODQuMDUtMy41OSAxOS4xOS0xMC42NiAyNS42Mi0xNy41IDI2LjI1LTE0Ljg2IDEuMzctMjYuMTUtOS44My00MC41NS0xOS4yNy0yMi41My0xNC43Ni0zNS4yNi0yMy45Ni01Ny4xMy0zOC4zNy0yNS4yOC0xNi42Ni04Ljg5LTI1LjgxIDUuNTEtNDAuNzcgMy43Ny0zLjkyIDY5LjI3LTYzLjUgNzAuNTQtNjguOS4xNi0uNjguMzEtMy4yLTEuMTktNC41M3MtMy43MS0uODctNS4zLS41MWMtMi4yNi41MS0zOC4yNSAyNC4zLTEwNy45OCA3MS4zNy0xMC4yMiA3LjAyLTE5LjQ4IDEwLjQzLTI3Ljc3IDEwLjI2LTkuMTQtLjItMjYuNzItNS4xNy0zOS43OS05LjQyLTE2LjAzLTUuMjEtMjguNzctNy45Ny0yNy42Ni0xNi44Mi41Ny00LjYxIDYuOTItOS4zMiAxOS4wNC0xNC4xNHoiLz48L3N2Zz4=',
    tiktok: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMjU2IDBjMTQxLjM4NSAwIDI1NiAxMTQuNjE1IDI1NiAyNTZTMzk3LjM4NSA1MTIgMjU2IDUxMiAwIDM5Ny4zODUgMCAyNTYgMTE0LjYxNSAwIDI1NiAweiIvPjxwYXRoIGZpbGw9IiMyRENDRDMiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTM0NC40ODcgMTYxLjMxMmMxMS41ODUgMTEuOTQ1IDI2LjAzMyAxOS4yMjYgNDAuNTkzIDIyLjUzOXYtOC45NzFjLTEzLjY4MS0uOTY5LTI3Ljk5My01LjI3NC00MC41OTMtMTMuNTY4em0tODMuNjg5LTU5LjE2NnYyMDAuNjAxYzAgMjYuMjgxLTE4Ljg4OCA0My4xODUtNDEuODU1IDQzLjE4NS03LjYxOSAwLTE0Ljg1NC0xLjc4MS0yMS4xNDItNS4wNzEgNy45NzkgMTAuMTg4IDIwLjU3OCAxNi4wNDggMzQuMzk1IDE2LjA0OCAyMi45NjggMCA0MS44NTUtMTYuOTA1IDQxLjg1NS00My4yMDhWMTEzLjFoMzYuNDAxYTEwMC4yNzggMTAwLjI3OCAwIDAxLTIuNDM0LTEwLjk1NGgtNDcuMjJ6bS0yOS44NjQgMTE2LjYxOHYtOS45MzljLTQuNTk5LS43NjYtOS4xOTYtMS4wMTUtMTMuMDA2LTEuMDE1LTUxLjgxOCAwLTk1LjIwNiA0MS41ODYtOTUuMjA2IDkzLjE1NSAwIDMzLjg1NSAxNi40NzYgNjIuNzk1IDQxLjUxNyA3OS45MjYtMTcuNDQ1LTE3LjMxLTI4LjI2NC00MS41NC0yOC4yNjQtNjguOTcxIDAtNTEuNDggNDMuMjUzLTkzLjA0MyA5NC45NTktOTMuMTU2eiIvPjxwYXRoIGZpbGw9IiNGMTIwNEEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTMxMy4zNiAyOTkuNDMzYzAgNjQuMDU3LTQ5LjAwMSA5OC4wMDItOTUuMTg0IDk4LjAwMi0xOS45OTIgMC0zOC41NjQtNi4wNDEtNTMuOTM3LTE2LjU0NSAxNy4yNjYgMTcuMTMxIDQxLjAyMiAyNy40OTkgNjcuMTkgMjcuNDk5IDQ2LjE4NCAwIDk1LjE4NC0zMy45NDUgOTUuMTg0LTk4LjAwMnYtMTA0LjM4Yy00LjU5Ny0zLjExLTkuMDE1LTYuNzM5LTEzLjI1My0xMC45NzZ2MTA0LjQwMnpNMTk3LjgwMSAzNDAuODZjLTUuNjM1LTcuMTIyLTguOTk0LTE2LjM0MS04Ljk5NC0yNy4xNTkgMC0zMC4zNjEgMjMuNzM0LTQ2LjQwOSA1NS4zOC00My4wNzN2LTUwLjg0OWMtNC41OTgtLjc2Ni05LjE5Ni0xLjAxNC0xMy4wMjgtMS4wMTRoLS4yMjZ2NDAuODg2Yy0zMS42NDQtMy4zMTMtNTUuMzc5IDEyLjcxMi01NS4zNzkgNDMuMDk2IDAgMTcuNzYxIDkuMDg0IDMxLjIzOSAyMi4yNDcgMzguMTEzek0zODUuMDggMTgzLjg1MXYzNy45NzljLTIxLjAyOSAwLTQwLjkzMS00LjAxMi01OC40NjctMTUuODIzIDIwLjQyMSAyMC40MjEgNDUuMTkyIDI2LjggNzEuNzIxIDI2Ljh2LTQ2Ljk3MmE4Mi4zNjcgODIuMzY3IDAgMDEtMTMuMjU0LTEuOTg0em0tNDAuNTkzLTIyLjU0Yy0xMS4yMDItMTEuNTE3LTE5Ljc0NS0yNy4zODUtMjMuMjE1LTQ4LjIxMWgtMTAuODE5YzYuMTc2IDIyLjUxNyAxOC44ODggMzguMjI3IDM0LjAzNCA0OC4yMTF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjE4LjE3NiAzOTcuNDM1YzQ2LjE4MyAwIDk1LjE4NC0zMy45NDQgOTUuMTg0LTk4LjAwMlYxOTUuMDMxYzQuMjM4IDQuMjM3IDguNjU1IDcuODY2IDEzLjI1MyAxMC45NzYgMTcuNTM2IDExLjgxMSAzNy40MzggMTUuODIzIDU4LjQ2OCAxNS44MjN2LTM3Ljk3OWMtMTQuNTYxLTMuMzEzLTI5LjAwOS0xMC41OTMtNDAuNTk0LTIyLjU0LTE1LjE0Ni05Ljk4NC0yNy44NTktMjUuNjk0LTM0LjAzNC00OC4yMTFoLTM2LjQwMnYyMDAuNjAxYzAgMjYuMzAzLTE4Ljg4OCA0My4yMDgtNDEuODU2IDQzLjIwOC0xMy44MTYgMC0yNi40MTUtNS44Ni0zNC4zOTQtMTYuMDQ4LTEzLjE2My02Ljg3NS0yMi4yNDctMjAuMzUzLTIyLjI0Ny0zOC4xMTQgMC0zMC4zODQgMjMuNzM0LTQ2LjQwOSA1NS4zNzktNDMuMDk2di00MC44ODdjLTUxLjcwNS4xMTMtOTQuOTU4IDQxLjY3Ni05NC45NTggOTMuMTU2IDAgMjcuNDMxIDEwLjgxOSA1MS42NjEgMjguMjY0IDY4Ljk3MSAxNS4zNzIgMTAuNTAzIDMzLjk0NSAxNi41NDQgNTMuOTM3IDE2LjU0NHoiLz48L3N2Zz4=',
    twitter: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzFkYTFmMjt9LmNscy0xLC5jbHMtMntmaWxsLXJ1bGU6ZXZlbm9kZDt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPnR3aXR0ZXItc3F1YXJlLWNvbG9yPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yNS4yLDBIOTcuNjhhMjUuMjcsMjUuMjcsMCwwLDEsMjUuMiwyNS4yVjk3LjY4YTI1LjI3LDI1LjI3LDAsMCwxLTI1LjIsMjUuMkgyNS4yQTI1LjI3LDI1LjI3LDAsMCwxLDAsOTcuNjhWMjUuMkEyNS4yNywyNS4yNywwLDAsMSwyNS4yLDBaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOTcuNTIsMzkuMDZBMjkuMjcsMjkuMjcsMCwwLDEsODksNDEuMzlhMTUsMTUsMCwwLDAsNi41MS04LjE5LDI5LjcxLDI5LjcxLDAsMCwxLTkuNCwzLjU5LDE0LjgxLDE0LjgxLDAsMCwwLTI1LjYsMTAuMTMsMTQuNDUsMTQuNDUsMCwwLDAsLjM4LDMuMzdBNDIsNDIsMCwwLDEsMzAuNDEsMzQuODJhMTQuODYsMTQuODYsMCwwLDAtMiw3LjQ0aDBBMTQuNzYsMTQuNzYsMCwwLDAsMzUsNTQuNTdhMTQuODUsMTQuODUsMCwwLDEtNi43MS0xLjg0di4xOUExNC44LDE0LjgsMCwwLDAsNDAuMTUsNjcuNDNhMTQuNzQsMTQuNzQsMCwwLDEtMy45LjUyLDE2LjIsMTYuMiwwLDAsMS0yLjgtLjI2QTE0Ljg1LDE0Ljg1LDAsMCwwLDQ3LjI4LDc4LDI5Ljg2LDI5Ljg2LDAsMCwxLDI1LjM1LDg0LjFhNDEuOTIsNDEuOTIsMCwwLDAsMjIuNyw2LjY1YzI3LjIzLDAsNDIuMTMtMjIuNTYsNDIuMTMtNDIuMTIsMC0uNjUsMC0xLjI4LDAtMS45MWEyOS44MywyOS44MywwLDAsMCw3LjM4LTcuNjVoMFoiLz48L3N2Zz4=',
    whatsapp: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtMXtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjEzMzcuMjgiIHkxPSI1MTguMjQiIHgyPSIxMzM3LjI4IiB5Mj0iLTIxNjQuODIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC4xOSwgMCwgMCwgLTAuMTksIDAuODEsIDk4Ljg5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzYxZmQ3ZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJiYjgyNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT53YTwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTEyLDM4Mi4wN2MwLDIuOC0uMDksOC44OC0uMjYsMTMuNTgtLjQxLDExLjQ5LTEuMzIsMjYuMzItMi43LDMzLjA3YTEwOS43NiwxMDkuNzYsMCwwLDEtOS4yNywyNy43MSw5OC40NSw5OC40NSwwLDAsMS00My40Myw0My4zOSwxMTAuMjEsMTEwLjIxLDAsMCwxLTI3Ljg3LDkuMjhjLTYuNjksMS4zNS0yMS40MSwyLjI0LTMyLjgyLDIuNjUtNC43MS4xNy0xMC43OS4yNS0xMy41OC4yNWwtMjUyLjEsMGMtMi44LDAtOC44OC0uMDktMTMuNTgtLjI2LTExLjQ5LS40MS0yNi4zMi0xLjMyLTMzLjA3LTIuNjlhMTEwLjM3LDExMC4zNywwLDAsMS0yNy43Mi05LjI4QTk4LjUsOTguNSwwLDAsMSwxMi4xOCw0NTYuMywxMTAuMjEsMTEwLjIxLDAsMCwxLDIuOSw0MjguNDNDMS41NSw0MjEuNzQuNjYsNDA3LC4yNSwzOTUuNjEuMDgsMzkwLjkxLDAsMzg0LjgyLDAsMzgybDAtMjUyLjFjMC0yLjguMDktOC44OC4yNS0xMy41OEMuNzEsMTA0Ljg2LDEuNjIsOTAsMyw4My4yOGExMTAuMzcsMTEwLjM3LDAsMCwxLDkuMjctMjcuNzJBOTguNTksOTguNTksMCwwLDEsNTUuNywxMi4xOCwxMTAuMjEsMTEwLjIxLDAsMCwxLDgzLjU3LDIuOUM5MC4yNiwxLjU1LDEwNSwuNjYsMTE2LjM5LjI1LDEyMS4wOS4wOCwxMjcuMTgsMCwxMzAsMGwyNTIuMSwwYzIuOCwwLDguODguMDksMTMuNTguMjVDNDA3LjE0LjcxLDQyMiwxLjYyLDQyOC43MiwzYTExMC4zNywxMTAuMzcsMCwwLDEsMjcuNzIsOS4yN0E5OC41OSw5OC41OSwwLDAsMSw0OTkuODIsNTUuN2ExMTAuMjEsMTEwLjIxLDAsMCwxLDkuMjgsMjcuODdjMS4zNSw2LjY5LDIuMjQsMjEuNDEsMi42NSwzMi44Mi4xNyw0LjcuMjUsMTAuNzkuMjUsMTMuNThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzc5LjU2LDEzMS42N0ExNzIuNCwxNzIuNCwwLDAsMCwyNTYuNjcsODAuNzNDMTYxLDgwLjczLDgzLjA1LDE1OC42NCw4My4wNSwyNTQuNDJhMTczLjQ3LDE3My40NywwLDAsMCwyMy4yLDg2LjgybC0yNC42NSw5MCw5Mi4wOC0yNC4xN2ExNzMuNTUsMTczLjU1LDAsMCwwLDgzLDIxLjE3aC4wN2M5NS43MywwLDE3My42OS03Ny45MSwxNzMuNjktMTczLjY5QTE3Mi43MywxNzIuNzMsMCwwLDAsMzc5LjUzLDEzMS43bDAsMFpNMjU2LjcyLDM5OWExNDQuMTcsMTQ0LjE3LDAsMCwxLTczLjUyLTIwLjE0bC01LjI5LTMuMTVMMTIzLjI3LDM5MGwxNC41OS01My4yNy0zLjQyLTUuNDdhMTQzLjI5LDE0My4yOSwwLDAsMS0yMi4xMS03Ni44MUMxMTIuMzMsMTc0LjgxLDE3Ny4xLDExMCwyNTYuOCwxMTBBMTQ0LjM0LDE0NC4zNCwwLDAsMSw0MDEuMTIsMjU0LjQ4Yy0uMDcsNzkuNjctNjQuODMsMTQ0LjQ2LTE0NC40MSwxNDQuNDZ2MFpNMzM1Ljg3LDI5MC44Yy00LjMyLTIuMi0yNS42OC0xMi42Ny0yOS42NS0xNC4xMnMtNi44NS0yLjE5LTkuOCwyLjItMTEuMjIsMTQuMTEtMTMuNzYsMTctNS4wNiwzLjI5LTkuMzcsMS4wOS0xOC4zNS02Ljc3LTM0LjkyLTIxLjU2Yy0xMi44OC0xMS41LTIxLjYxLTI1Ljc0LTI0LjE1LTMwcy0uMjktNi43MSwxLjkyLTguODNjMi0xLjkzLDQuMzItNS4wNiw2LjUxLTcuNnMyLjg4LTQuMzIsNC4zMi03LjI2Ljc0LTUuNDItLjM1LTcuNi05LjgtMjMuNTUtMTMuMzQtMzIuMjVjLTMuNDktOC41MS03LjEyLTcuMzItOS43OS03LjQ3cy01LjQyLS4xMy04LjI5LS4xM2ExNiwxNiwwLDAsMC0xMS41Nyw1LjQxYy00LDQuMzItMTUuMiwxNC44Ni0xNS4yLDM2LjIyczE1LjU0LDQyLDE3LjcyLDQ0LjkxLDMwLjYxLDQ2Ljc2LDc0LjE0LDY1LjU0YzEwLjM0LDQuNDQsMTguNDIsNy4xMSwyNC43Miw5LjE4YTYwLDYwLDAsMCwwLDI3LjMyLDEuNzFjOC4zNS0xLjIzLDI1LjY4LTEwLjQ5LDI5LjMxLTIwLjYyczMuNjMtMTguODMsMi41NS0yMC42Mi0zLjkxLTMtOC4yOS01LjIybDAsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L3N2Zz4=',
    youtube: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZyBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGZpbGw9InJlZCIgZD0iTTI1NS45NCA1MTEuOTlBMjU2LjAwMyAyNTYuMDAzIDAgMDA0OTIuNSAzNTRhMjU1Ljk0NiAyNTUuOTQ2IDAgMDAxNC41OC0xNDcuOTFBMjU1Ljk5MyAyNTUuOTkzIDAgMDA0MzcuMDQgNzUgMjU2LjA3IDI1Ni4wNyAwIDAwMzA1Ljk3IDQuOTJhMjU2LjA2NCAyNTYuMDY0IDAgMDAtMTQ3LjkyIDE0LjU2IDI1NS45MjYgMjU1LjkyNiAwIDAwLTExNC45IDk0LjI5QTI1NiAyNTYgMCAwMDAgMjU2YzAgMzMuNjEgNi42MSA2Ni45IDE5LjQ3IDk3Ljk2YTI1NS44NDMgMjU1Ljg0MyAwIDAwNTUuNDcgODMuMDUgMjU1Ljk5MSAyNTUuOTkxIDAgMDA4My4wNCA1NS41IDI1NS45MDIgMjU1LjkwMiAwIDAwOTcuOTYgMTkuNDh6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI1NS45NCAxMjEuMjJjMjYuNjgtLjAzIDUyLjc2IDcuODUgNzQuOTYgMjIuNjRhMTM0Ljg0IDEzNC44NCAwIDAxNDkuNzQgNjAuNDkgMTM0Ljc5NyAxMzQuNzk3IDAgMDE3LjczIDc3LjkyIDEzNC41OCAxMzQuNTggMCAwMS0zNi44OCA2OS4wOCAxMzQuODIyIDEzNC44MjIgMCAwMS02OS4wNSAzNi45NSAxMzQuODMgMTM0LjgzIDAgMDEtNzcuOTMtNy42OCAxMzQuNzc4IDEzNC43NzggMCAwMS02MC41Mi00OS42OEExMzQuODggMTM0Ljg4IDAgMDExMjEuMjcgMjU2Yy4wNi0zNS43MSAxNC4yNS02OS45NSAzOS40OS05NS4yMWExMzQuOTQ1IDEzNC45NDUgMCAwMTk1LjE4LTM5LjU3em0tNDkuNDIgMjEwLjQzTDMzNy40NSAyNTZsLTEzMC45My03NS41OXYxNTEuMjR6bTQ5LjQyLTIzMS4wNWMtMzAuNzUgMC02MC44MSA5LjEyLTg2LjM4IDI2LjJhMTU1LjQzOCAxNTUuNDM4IDAgMDAtNTcuMjUgNjkuNzggMTU1LjQxMyAxNTUuNDEzIDAgMDAtOC44NCA4OS44MiAxNTUuNTI0IDE1NS41MjQgMCAwMDQyLjU2IDc5LjYgMTU1LjQ2NyAxNTUuNDY3IDAgMDA3OS42MiA0Mi41MyAxNTUuNDMgMTU1LjQzIDAgMDA4OS44Mi04Ljg3IDE1NS4zNzEgMTU1LjM3MSAwIDAwNjkuNzUtNTcuMjhBMTU1LjQwOCAxNTUuNDA4IDAgMDA0MTEuMzkgMjU2YzAtMjAuNDItNC4wMi00MC42My0xMS44My01OS40OWExNTUuNDU1IDE1NS40NTUgMCAwMC0zMy43LTUwLjQyIDE1NS41MzYgMTU1LjUzNiAwIDAwLTUwLjQ0LTMzLjY4IDE1NS40NCAxNTUuNDQgMCAwMC01OS40OC0xMS44MXoiLz48L2c+PC9zdmc+'
};

export default function App() {
    const [lang, setLang] = useState('th'); // 'th' | 'en'

    const t = translations[lang];

    const toggleLang = () => setLang(l => l === 'th' ? 'en' : 'th');

    const [activeTab, setActiveTab] = useState('url');

    // Content State
    const [urlInput, setUrlInput] = useState('https://www.example.com');
    const [textInput, setTextInput] = useState('');
    const [wifiSsid, setWifiSsid] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');

    // Generated Data
    const [qrString, setQrString] = useState('https://www.example.com');

    // Appearance State
    const [qrColor, setQrColor] = useState('#000000'); // สีจุด QR
    const [qrBgColor, setQrBgColor] = useState('#ffffff'); // สีพื้นหลังเฉพาะตัว QR

    const [cardBgColor, setCardBgColor] = useState('#f8fafc'); // สีพื้นหลังทั้งใบ
    const [cardBgImage, setCardBgImage] = useState(null); // รูปพื้นหลังทั้งใบ
    const [bgScale, setBgScale] = useState(100);
    const [bgX, setBgX] = useState(50);
    const [bgY, setBgY] = useState(50);

    const [frameType, setFrameType] = useState('none');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [customLogo, setCustomLogo] = useState(null);

    // Layout State
    const [qrScale, setQrScale] = useState(80); // Default 80% size
    const [logoScale, setLogoScale] = useState(0.23); // Default ~23% of QR size
    const [qrX, setQrX] = useState(50); // % X position (Center)
    const [qrY, setQrY] = useState(50); // % Y position (Center)

    // Loading & Processing
    const [loading, setLoading] = useState(false);
    const [qrBlobUrl, setQrBlobUrl] = useState(null);

    // --- Logic 1: Handle Content Changes (Debounced) ---
    useEffect(() => {
        const timer = setTimeout(() => {
            let finalString = '';
            if (activeTab === 'url') finalString = urlInput;
            else if (activeTab === 'text') finalString = textInput;
            else if (activeTab === 'wifi') finalString = `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;

            setQrString(finalString);
        }, 500);
        return () => clearTimeout(timer);
    }, [urlInput, textInput, wifiSsid, wifiPassword, wifiEncryption, activeTab]);

    // --- Logic 2: Fetch Base QR Image from API ---
    useEffect(() => {
        let isMounted = true;
        const fetchQr = async () => {
            setLoading(true);
            try {
                const cleanFg = qrColor.replace('#', '');
                const cleanBg = qrBgColor.replace('#', '');
                // Fetch QR with specified fg/bg colors
                const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(qrString)}&color=${cleanFg}&bgcolor=${cleanBg}&margin=0&ecc=H`;

                const res = await fetch(apiUrl);
                const blob = await res.blob();
                const objectUrl = URL.createObjectURL(blob);

                if (isMounted) {
                    setQrBlobUrl(objectUrl);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error generating QR", err);
                setLoading(false);
            }
        };

        fetchQr();
        return () => {
            isMounted = false;
            if (qrBlobUrl) URL.revokeObjectURL(qrBlobUrl);
        };
    }, [qrString, qrColor, qrBgColor]);

    // --- Logic 3: Handle Uploads ---
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomLogo(reader.result);
                setSelectedIcon('custom');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBgUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCardBgImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Logic 5: Drag Handling (QR & Background) ---
    const previewRef = useRef(null);
    const draggingState = useRef({
        isDragging: false,
        target: null, // 'qr' or 'bg'
        startX: 0,
        startY: 0,
        initialWx: 50, // width-based X %
        initialWy: 50  // height-based Y %
    });

    const handleMouseDown = (e) => {
        const isQrClick = e.target.closest('.qr-movable');

        // Valid drag targets?
        if (!isQrClick && !cardBgImage) return;

        draggingState.current = {
            isDragging: true,
            target: isQrClick ? 'qr' : 'bg',
            startX: e.clientX,
            startY: e.clientY,
            initialWx: isQrClick ? qrX : bgX, // Both use 0-100 scale logic
            initialWy: isQrClick ? qrY : bgY
        };
    };

    const handleMouseMove = (e) => {
        if (!draggingState.current.isDragging) return;
        e.preventDefault();

        if (previewRef.current) {
            const { width, height } = previewRef.current.getBoundingClientRect();
            const dx = e.clientX - draggingState.current.startX;
            const dy = e.clientY - draggingState.current.startY;

            // Convert pixel delta to percentage
            const deltaX = (dx / width) * 100;
            const deltaY = (dy / height) * 100;

            const { target, initialWx, initialWy } = draggingState.current;

            if (target === 'qr') {
                // Direct manipulation: Move right = increase X
                let newX = initialWx + deltaX;
                let newY = initialWy + deltaY;
                // Clamp 0-100
                setQrX(Math.max(0, Math.min(100, newX)));
                setQrY(Math.max(0, Math.min(100, newY)));
            } else if (target === 'bg') {
                // Panning: Moving mouse right "pulls" image right (or changes background position)
                // Previous logic was inverted (panning viewport), but usually bg position moves with mouse
                // Let's stick to "Direct manipulation" for consistency if it feels natural, 
                // OR keep the "inverted" if it was strictly background-position based.
                // CSS background-position: 0% = left, 100% = right.
                // If I drag RIGHT, I want to see more of the Left side? No, I want to move the image Right.
                // Moving image Right means moving absolute px.
                // But background-position % is tricky. 
                // Let's stick to the previous verified logic for BG:
                // prev: newX = start - delta. (Inverted). 
                // If I drag right (positive delta), X decreases.
                // Let's preserve the existing "feel" for BG, but use standard for QR.
                let newX = initialWx - deltaX;
                let newY = initialWy - deltaY;
                setBgX(Math.max(0, Math.min(100, newX)));
                setBgY(Math.max(0, Math.min(100, newY)));
            }
        }
    };

    const handleMouseUp = () => {
        draggingState.current.isDragging = false;
    };

    // --- Touch Support ---
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        const isQrClick = e.target.closest('.qr-movable');

        // Valid drag targets?
        if (!isQrClick && !cardBgImage) return;

        draggingState.current = {
            isDragging: true,
            target: isQrClick ? 'qr' : 'bg',
            startX: touch.clientX,
            startY: touch.clientY,
            initialWx: isQrClick ? qrX : bgX,
            initialWy: isQrClick ? qrY : bgY
        };
    };

    const handleTouchMove = (e) => {
        if (!draggingState.current.isDragging) return;
        // Prevent scrolling while dragging
        if (e.cancelable) e.preventDefault();

        const touch = e.touches[0];

        if (previewRef.current) {
            const { width, height } = previewRef.current.getBoundingClientRect();
            const dx = touch.clientX - draggingState.current.startX;
            const dy = touch.clientY - draggingState.current.startY;

            // Convert pixel delta to percentage
            const deltaX = (dx / width) * 100;
            const deltaY = (dy / height) * 100;

            const { target, initialWx, initialWy } = draggingState.current;

            if (target === 'qr') {
                let newX = initialWx + deltaX;
                let newY = initialWy + deltaY;
                setQrX(Math.max(0, Math.min(100, newX)));
                setQrY(Math.max(0, Math.min(100, newY)));
            } else if (target === 'bg') {
                let newX = initialWx - deltaX;
                let newY = initialWy - deltaY;
                setBgX(Math.max(0, Math.min(100, newX)));
                setBgY(Math.max(0, Math.min(100, newY)));
            }
        }
    };

    const handleTouchEnd = () => {
        draggingState.current.isDragging = false;
    };

    // --- Logic 4: Draw Final Canvas ---
    const drawCanvas = async () => {
        const width = 900;
        const height = 1200; // 3:4 Aspect Ratio

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Fixed Canvas for output
        canvas.width = width;
        canvas.height = height;

        // 1. Draw Background (Color or Image)
        if (cardBgImage) {
            const bgImg = await loadImage(cardBgImage);
            // Draw image cover (with position adjustment)
            drawImageProp(ctx, bgImg, 0, 0, width, height, bgX / 100, bgY / 100);
        } else {
            ctx.fillStyle = cardBgColor;
            ctx.fillRect(0, 0, width, height);
        }

        // 2. Prepare QR Composite (QR + Frame + Logo)
        // We calculate size based on scale slider (relative to the smaller dimension)
        const minDim = Math.min(width, height);
        const qrCompositeSize = (qrScale / 100) * minDim;

        // Calculate Position based on X/Y sliders (Center anchor)
        const posX = (qrX / 100) * width;
        const posY = (qrY / 100) * height;

        // Save context to translate/rotate if needed
        ctx.save();
        ctx.translate(posX, posY);

        // --- DRAWING LOGIC ---

        if (frameType === 'scan-top' || frameType === 'card-bottom') {
            // "Polaroid / Card" Style (Top or Bottom)
            const boxSize = qrCompositeSize;
            const halfBox = boxSize / 2;
            const isBottom = frameType === 'card-bottom';

            // 1. Draw Card Background
            ctx.fillStyle = qrColor;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(-halfBox, -halfBox, boxSize, boxSize, boxSize * 0.05);
            else ctx.rect(-halfBox, -halfBox, boxSize, boxSize);
            ctx.fill();

            // 2. Draw Text (Top or Bottom)
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `bold ${boxSize * 0.08}px "Outfit", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textY = isBottom
                ? halfBox - (boxSize * 0.1)
                : -halfBox + (boxSize * 0.1);

            ctx.fillText(t.scanMe, 0, textY);

            // 3. Draw White Inner Box
            const innerPadding = boxSize * 0.05;
            const headerHeight = boxSize * 0.15;
            const wBoxW = boxSize * 0.85;
            const wBoxX = -wBoxW / 2;

            // If bottom, header is at bottom, so white box is at top.
            // If top, header is at top, white box is below it.
            const wBoxY = isBottom
                ? -halfBox + (innerPadding / 2)
                : -halfBox + headerHeight + (innerPadding / 2);

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(wBoxX, wBoxY, wBoxW, wBoxW, boxSize * 0.03);
            else ctx.rect(wBoxX, wBoxY, wBoxW, wBoxW);
            ctx.fill();

            // 4. Draw QR Code inside white box
            if (qrBlobUrl) {
                const img = await loadImage(qrBlobUrl);
                const wbCX = 0;
                const wbCY = wBoxY + (wBoxW / 2);
                const qrImgSize = wBoxW * 0.9;
                ctx.drawImage(img, wbCX - qrImgSize / 2, wbCY - qrImgSize / 2, qrImgSize, qrImgSize);
            }

            // 5. Draw Custom Logo
            if (selectedIcon) {
                let logoSrc = null;
                if (selectedIcon === 'custom' && customLogo) logoSrc = customLogo;
                else if (LOGO_ASSETS[selectedIcon]) logoSrc = LOGO_ASSETS[selectedIcon];

                if (logoSrc) {
                    const logoSize = wBoxW * logoScale;
                    const wbCX = 0;
                    const wbCY = wBoxY + (wBoxW / 2);
                    const logoImg = await loadImage(logoSrc);
                    ctx.drawImage(logoImg, wbCX - logoSize / 2, wbCY - logoSize / 2, logoSize, logoSize);
                }
            }

        } else {
            // STANDARD STYLES (None, Border, Bottom, Bubble, Box)
            const framePadding = (frameType === 'none') ? 0 :
                (frameType.startsWith('box')) ? (qrCompositeSize * 0.12) :
                    (qrCompositeSize * 0.08);
            const qrSize = qrCompositeSize - (framePadding * 2);

            // Draw Border if needed (Border or Box styles)
            if (frameType === 'border' || frameType === 'box-top' || frameType === 'box-bottom') {
                ctx.strokeStyle = qrColor;
                ctx.lineWidth = qrCompositeSize * 0.02;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-qrCompositeSize / 2, -qrCompositeSize / 2, qrCompositeSize, qrCompositeSize, qrCompositeSize * 0.02);
                else ctx.rect(-qrCompositeSize / 2, -qrCompositeSize / 2, qrCompositeSize, qrCompositeSize);
                ctx.stroke();
            }

            // Draw Bubble Brackets (Top or Bottom)
            if (frameType.startsWith('bubble')) {
                ctx.strokeStyle = qrColor;
                ctx.lineWidth = qrCompositeSize * 0.02;
                const s = qrCompositeSize / 2;
                const len = qrCompositeSize * 0.2; // bracket length

                ctx.beginPath();
                // TL
                ctx.moveTo(-s, -s + len); ctx.lineTo(-s, -s); ctx.lineTo(-s + len, -s);
                // TR
                ctx.moveTo(s - len, -s); ctx.lineTo(s, -s); ctx.lineTo(s, -s + len);
                // BL
                ctx.moveTo(-s, s - len); ctx.lineTo(-s, s); ctx.lineTo(-s + len, s);
                // BR
                ctx.moveTo(s - len, s); ctx.lineTo(s, s); ctx.lineTo(s, s - len);
                ctx.stroke();
            }

            // Draw QR Image
            if (qrBlobUrl) {
                const img = await loadImage(qrBlobUrl);
                ctx.drawImage(img, -qrSize / 2, -qrSize / 2, qrSize, qrSize);
            }

            // Draw Text Standard
            ctx.fillStyle = qrColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textOffset = qrCompositeSize / 2 + (qrCompositeSize * 0.05);

            if (frameType === 'scan-bottom') {
                ctx.font = `bold ${qrCompositeSize * 0.08}px "Outfit", sans-serif`;
                ctx.fillText(t.scanMe, 0, textOffset);
            } else if (frameType === 'bubble-bottom' || frameType === 'bubble-top') {
                const isBottom = frameType === 'bubble-bottom';

                // Draw Bubble Pill
                const bubbleW = qrCompositeSize * 0.6;
                const bubbleH = qrCompositeSize * 0.15;
                const bubbleGap = qrCompositeSize * 0.08;
                const bubbleY = isBottom
                    ? (qrCompositeSize / 2) + bubbleGap
                    : -(qrCompositeSize / 2) - bubbleH - bubbleGap;

                // Bubble Shape
                ctx.fillStyle = qrColor;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-bubbleW / 2, bubbleY, bubbleW, bubbleH, bubbleH);
                else ctx.rect(-bubbleW / 2, bubbleY, bubbleW, bubbleH);
                ctx.fill();

                // Triangle
                ctx.beginPath();
                if (isBottom) {
                    // Triangle points UP to QR
                    ctx.moveTo(0, bubbleY - 5);
                    ctx.lineTo(-8, bubbleY + 2);
                    ctx.lineTo(8, bubbleY + 2);
                } else {
                    // Top Bubble, Triangle points DOWN to QR
                    // Bubble Bottom is bubbleY + bubbleH
                    ctx.moveTo(0, bubbleY + bubbleH + 5);
                    ctx.lineTo(-8, bubbleY + bubbleH - 2);
                    ctx.lineTo(8, bubbleY + bubbleH - 2);
                }
                ctx.fill();

                // Text White
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${bubbleH * 0.6}px "Outfit", sans-serif`;
                ctx.fillText(t.scanMe, 0, bubbleY + (bubbleH / 2));

            } else if (frameType === 'box-top' || frameType === 'box-bottom') {
                const isBottom = frameType === 'box-bottom';

                // Draw "Sticker" Box ON TOP EDGE of the border
                const boxW = qrCompositeSize * 0.5;
                const boxH = qrCompositeSize * 0.12;

                // Position centered on the line
                // Top line is at -(qrCompositeSize/2)
                // Bottom line is at (qrCompositeSize/2)

                const drawY = isBottom
                    ? (qrCompositeSize / 2) - (boxH / 2)
                    : -(qrCompositeSize / 2) - (boxH / 2);

                ctx.fillStyle = qrColor;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-boxW / 2, drawY, boxW, boxH, boxH * 0.2);
                else ctx.rect(-boxW / 2, drawY, boxW, boxH);
                ctx.fill();

                // Text
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${boxH * 0.6}px "Outfit", sans-serif`;
                ctx.fillText(t.scanMe, 0, drawY + (boxH / 2));
            }

            // Draw Custom Logo (Standard Center)
            if (selectedIcon) {
                let logoSrc = null;
                if (selectedIcon === 'custom' && customLogo) logoSrc = customLogo;
                else if (LOGO_ASSETS[selectedIcon]) logoSrc = LOGO_ASSETS[selectedIcon];

                if (logoSrc) {
                    const logoSize = qrSize * logoScale;
                    const logoImg = await loadImage(logoSrc);
                    // No background
                    ctx.drawImage(logoImg, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
                }
            }
        }

        return canvas.toDataURL('image/png');
    };

    const dataURLtoFile = async (dataUrl, fileName) => {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const handleDownload = async () => {
        setLoading(true);
        try {
            const finalUrl = await drawCanvas();
            const fileName = `qrcode-${activeTab}-${Date.now()}.png`;

            // Try Web Share API first (Mobile preferred)
            // Check if navigator.share is available
            if (navigator.share) {
                try {
                    const file = await dataURLtoFile(finalUrl, fileName);

                    // Validate if files can be shared
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            files: [file],
                            title: 'QR Studio',
                            text: 'Created with QR Studio'
                        });
                        setLoading(false);
                        return; // Successfully shared
                    }
                } catch (shareError) {
                    // Ignore AbortError (User cancelled share sheet)
                    if (shareError.name === 'AbortError') {
                        setLoading(false);
                        return;
                    }
                    console.warn('Web Share API failed, falling back to download:', shareError);
                }
            }

            // Fallback: Standard Download Link (Desktop)
            const link = document.createElement('a');
            link.href = finalUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (e) {
            console.error(e);
            alert(lang === 'th' ? 'เกิดข้อผิดพลาดในการดาวน์โหลด' : 'Error downloading image');
        }
        setLoading(false);
    };

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    // Helper to draw image cover (like CSS object-fit: cover)
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 font-sans pb-20 selection:bg-indigo-500 selection:text-white">

            {/* Navbar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30">
                            <Sparkles size={20} fill="currentColor" />
                        </div>
                        <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                            QR Studio
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-colors"
                        >
                            <Globe size={16} />
                            {lang.toUpperCase()}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-xl shadow-slate-300 hover:-translate-y-0.5 gap-2 items-center"
                        >
                            <Download size={16} />
                            <span>{t.saveBtn}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: Controls */}
                <div className="lg:col-span-6 space-y-6">

                    {/* STEP 1: Content */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
                            <h2 className="font-bold text-slate-700">{t.step1}</h2>
                        </div>

                        <div className="p-6">
                            <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl">
                                <TabButton active={activeTab === 'url'} onClick={() => setActiveTab('url')} icon={<Link size={16} />} label={t.tabUrl} />
                                <TabButton active={activeTab === 'text'} onClick={() => setActiveTab('text')} icon={<Type size={16} />} label={t.tabText} />
                                <TabButton active={activeTab === 'wifi'} onClick={() => setActiveTab('wifi')} icon={<Wifi size={16} />} label={t.tabWifi} />
                            </div>

                            <div className="animate-fade-in">
                                {activeTab === 'url' && (
                                    <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder={t.urlPlaceholder} className="input-modern" />
                                )}
                                {activeTab === 'text' && (
                                    <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder={t.textPlaceholder} rows={3} className="input-modern pt-3 resize-none" />
                                )}
                                {activeTab === 'wifi' && (
                                    <div className="space-y-3">
                                        <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder={t.ssidPlaceholder} className="input-modern" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder={t.passPlaceholder} className="input-modern" />
                                            <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} className="input-modern bg-white cursor-pointer">
                                                <option value="WPA">WPA/WPA2</option>
                                                <option value="WEP">WEP</option>
                                                <option value="nopass">{t.noPass}</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* STEP 2: Appearance & Background */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                            <h2 className="font-bold text-slate-700">{t.step2}</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* QR Style */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-2">
                                    <Palette size={14} /> {t.colorQr}
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <ColorBtn color="#000000" setColor={setQrColor} activeColor={qrColor} />
                                    <ColorBtn color="#4F46E5" setColor={setQrColor} activeColor={qrColor} />
                                    <ColorBtn color="#BE123C" setColor={setQrColor} activeColor={qrColor} />
                                    <ColorBtn color="#047857" setColor={setQrColor} activeColor={qrColor} />
                                    <input type="color" value={qrColor} onChange={e => setQrColor(e.target.value)} className="w-10 h-10 rounded-full cursor-pointer border-2 border-slate-200 overflow-hidden p-0" />
                                </div>
                            </div>

                            {/* Background Control */}
                            <div className="pt-4 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-2">
                                    <ImageIcon size={14} /> {t.bgCard}
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Color Picker for Card */}
                                    <div className="space-y-2">
                                        <span className="text-xs text-slate-500 font-medium">{t.colorBg}</span>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={cardBgColor} onChange={e => { setCardBgColor(e.target.value); setCardBgImage(null) }} className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-0" />
                                            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">{cardBgColor}</span>
                                        </div>
                                    </div>

                                    {/* Image Upload for Card */}
                                    <div className="space-y-2">
                                        <span className="text-xs text-slate-500 font-medium">{t.orImage}</span>
                                        <label className="flex items-center justify-center gap-2 w-full h-10 px-3 rounded-lg border border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-colors">
                                            <Upload size={14} className="text-slate-500" />
                                            <span className="text-xs text-slate-600 truncate">{cardBgImage ? t.changeImg : t.upload}</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleBgUpload} />
                                        </label>
                                    </div>
                                </div>

                                {cardBgImage && (
                                    <>
                                        <div className="mt-3 relative group w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={cardBgImage} className="w-full h-full object-cover" />
                                            <button onClick={() => setCardBgImage(null)} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs">{t.remove}</button>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <Move size={14} /> {t.dragHint}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* STEP 3: Layout & Position */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">3</div>
                            <h2 className="font-bold text-slate-700">{t.step3}</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <ControlSlider
                                    icon={<Maximize size={16} />}
                                    label={t.size}
                                    value={qrScale}
                                    onChange={setQrScale}
                                    min={10} max={90}
                                />
                                <p className="text-xs text-slate-500 pt-2 flex items-center gap-2">
                                    <Move size={14} /> {t.dragQrHint}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">{t.frameStyle}</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <FrameOption active={frameType === 'none'} onClick={() => setFrameType('none')} label="None" />
                                    <FrameOption active={frameType === 'border'} onClick={() => setFrameType('border')} label="Border" />
                                    <FrameOption active={frameType === 'scan-top'} onClick={() => setFrameType('scan-top')} label="Card Top" />
                                    <FrameOption active={frameType === 'scan-bottom'} onClick={() => setFrameType('scan-bottom')} label="Text" />
                                    <FrameOption active={frameType === 'bubble-bottom'} onClick={() => setFrameType('bubble-bottom')} label="Bubble Btm" />
                                    <FrameOption active={frameType === 'bubble-top'} onClick={() => setFrameType('bubble-top')} label="Bubble Top" />
                                    <FrameOption active={frameType === 'card-bottom'} onClick={() => setFrameType('card-bottom')} label="Card Btm" />
                                    <FrameOption active={frameType === 'box-top'} onClick={() => setFrameType('box-top')} label="Box Top" />
                                    <FrameOption active={frameType === 'box-bottom'} onClick={() => setFrameType('box-bottom')} label="Box Btm" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STEP 4: Logo */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
                            <h2 className="font-bold text-slate-700">{t.step4}</h2>
                        </div>
                        <div className="p-6 flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedIcon(null)}
                                className={`p-2 rounded-lg border text-sm font-medium transition-all ${!selectedIcon ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                            >
                                None
                            </button>

                            {Object.keys(LOGO_ASSETS).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedIcon(key)}
                                    className={`p-2 rounded-lg border transition-all ${selectedIcon === key ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}
                                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                                >
                                    <img src={LOGO_ASSETS[key]} alt={key} className="w-6 h-6 object-contain" />
                                </button>
                            ))}

                            <button
                                onClick={() => { setSelectedIcon('custom'); document.getElementById('logoInput').click(); }}
                                className={`p-2 rounded-lg border transition-all ${selectedIcon === 'custom' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                                <Upload size={20} className={selectedIcon === 'custom' ? 'text-blue-600' : 'text-slate-500'} />
                            </button>

                            <input type="file" id="logoInput" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                            {selectedIcon === 'custom' && customLogo && <div className="text-xs text-green-600 flex items-center ml-2"><Check size={14} /> {t.loaded}</div>}
                        </div>

                        {/* Logo Size Slider */}
                        {selectedIcon && (
                            <div className="px-6 pb-6 pt-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center justify-between">
                                    <span>Logo Size</span>
                                    <span className="text-slate-500">{Math.round(logoScale * 100)}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="0.4"
                                    step="0.01"
                                    value={logoScale}
                                    onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                            </div>
                        )}
                    </section>

                </div>

                {/* RIGHT COLUMN: Preview */}
                <div className="lg:col-span-6 sticky top-28">
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.livePreview}</span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                            </div>
                        </div>

                        {/* CANVAS CONTAINER */}
                        <div
                            ref={previewRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                            className={`relative w-full aspect-[3/4] bg-slate-200 overflow-hidden group 
                              ${(cardBgImage || true) ? 'cursor-default' : ''} 
                           `}
                            /* NOTE: We set cursor via inline styles or specific element classes mostly */
                            style={{ cursor: draggingState.current?.isDragging ? 'grabbing' : 'default' }}
                        >
                            {/* Card Background Layer */}
                            <div
                                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-75 ease-linear pointer-events-none ${cardBgImage ? 'cursor-move' : ''}`}
                                style={{
                                    backgroundColor: cardBgColor,
                                    backgroundImage: cardBgImage ? `url(${cardBgImage})` : 'none',
                                    backgroundPosition: `${bgX}% ${bgY}%`
                                }}
                            />

                            {/* QR Object Container (Movable) */}
                            <div
                                className="qr-movable absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-75 ease-linear cursor-grab active:cursor-grabbing hover:scale-[1.01]"
                                style={{
                                    left: `${qrX}%`,
                                    top: `${qrY}%`,
                                    width: `${qrScale}%`,
                                    aspectRatio: '1/1', // Force square
                                    // height: `${qrScale}%`, Removed to allow aspect-ratio to control height based on width
                                }}
                            >
                                {/* The Visual QR Block */}
                                {frameType === 'scan-top' ? (
                                    // CARD TOP STYLE
                                    <div className="w-full h-full flex flex-col p-4 rounded-xl shadow-sm" style={{ backgroundColor: qrColor }}>
                                        <div className="text-center font-bold text-white mb-2" style={{ fontSize: 'clamp(8px, 1.5vw, 18px)' }}>
                                            {t.scanMe}
                                        </div>
                                        <div className="flex-1 bg-white rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
                                            {qrBlobUrl && (
                                                <img src={qrBlobUrl} alt="QR" className="w-full h-full object-contain mix-blend-multiply" />
                                            )}
                                            {selectedIcon && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div
                                                        className="flex items-center justify-center"
                                                        style={{
                                                            width: `${logoScale * 100}%`,
                                                            height: `${logoScale * 100}%`,
                                                            aspectRatio: '1/1',
                                                        }}
                                                    >
                                                        {selectedIcon === 'custom' && customLogo ? <img src={customLogo} className="w-full h-full object-cover rounded-md" /> :
                                                            LOGO_ASSETS[selectedIcon] ? <img src={LOGO_ASSETS[selectedIcon]} className="w-full h-full object-contain" /> :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : frameType === 'card-bottom' ? (
                                    // CARD BOTTOM STYLE (New)
                                    <div className="w-full h-full flex flex-col-reverse p-4 rounded-xl shadow-sm" style={{ backgroundColor: qrColor }}>
                                        <div className="text-center font-bold text-white mt-2" style={{ fontSize: 'clamp(8px, 1.5vw, 18px)' }}>
                                            {t.scanMe}
                                        </div>
                                        <div className="flex-1 bg-white rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
                                            {qrBlobUrl && (
                                                <img src={qrBlobUrl} alt="QR" className="w-full h-full object-contain mix-blend-multiply" />
                                            )}
                                            {selectedIcon && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div
                                                        className="flex items-center justify-center"
                                                        style={{
                                                            width: `${logoScale * 100}%`,
                                                            height: `${logoScale * 100}%`,
                                                            aspectRatio: '1/1',
                                                        }}
                                                    >
                                                        {selectedIcon === 'custom' && customLogo ? <img src={customLogo} className="w-full h-full object-cover rounded-md" /> :
                                                            LOGO_ASSETS[selectedIcon] ? <img src={LOGO_ASSETS[selectedIcon]} className="w-full h-full object-contain" /> :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    // STANDARD / BUBBLE / BOX STYLES
                                    <div className="relative w-full h-full">

                                        {/* QR Image Area */}
                                        <div
                                            className="relative w-full h-full transition-transform"
                                            style={{
                                                padding: (frameType === 'none') ? '0' :
                                                    (frameType.startsWith('box')) ? '12%' : '8%',
                                            }}
                                        >
                                            <div className="w-full h-full relative" style={{ backgroundColor: qrBgColor }}>
                                                {qrBlobUrl && (
                                                    <img src={qrBlobUrl} alt="QR" className="w-full h-full object-contain mix-blend-multiply" />
                                                )}

                                                {/* Logo Overlay */}
                                                {selectedIcon && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div
                                                            className="flex items-center justify-center"
                                                            style={{
                                                                width: `${logoScale * 100}%`,
                                                                height: `${logoScale * 100}%`,
                                                                aspectRatio: '1/1',
                                                            }}
                                                        >
                                                            {selectedIcon === 'custom' && customLogo ? (
                                                                <img src={customLogo} className="w-full h-full object-cover rounded-md" />
                                                            ) : LOGO_ASSETS[selectedIcon] ? (
                                                                <img src={LOGO_ASSETS[selectedIcon]} className="w-full h-full object-contain" />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Border Frame (Simple or Box) */}
                                                {(frameType === 'border' || frameType === 'box-top' || frameType === 'box-bottom') && (
                                                    <div className="absolute inset-0 border-[6px] border-solid rounded-xl" style={{ borderColor: qrColor }}></div>
                                                )}

                                                {/* Bubble Brackets (Common for Top/Bottom) */}
                                                {frameType.startsWith('bubble') && (
                                                    <>
                                                        <div className="absolute top-0 left-0 w-[20%] h-[20%] border-t-[6px] border-l-[6px]" style={{ borderColor: qrColor }}></div>
                                                        <div className="absolute top-0 right-0 w-[20%] h-[20%] border-t-[6px] border-r-[6px]" style={{ borderColor: qrColor }}></div>
                                                        <div className="absolute bottom-0 left-0 w-[20%] h-[20%] border-b-[6px] border-l-[6px]" style={{ borderColor: qrColor }}></div>
                                                        <div className="absolute bottom-0 right-0 w-[20%] h-[20%] border-b-[6px] border-r-[6px]" style={{ borderColor: qrColor }}></div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* TEXT ELEMENTS */}

                                        {/* scan-bottom: Plain Text */}
                                        {frameType === 'scan-bottom' && (
                                            <div className="absolute -bottom-[15%] w-full text-center font-bold" style={{ color: qrColor, fontSize: 'clamp(8px, 2vw, 24px)' }}>
                                                {t.scanMe}
                                            </div>
                                        )}

                                        {/* bubble-bottom */}
                                        {frameType === 'bubble-bottom' && (
                                            <div className="absolute -bottom-[18%] left-1/2 -translate-x-1/2 bg-black text-white px-[1em] py-[0.35em] rounded-full font-bold shadow-sm whitespace-nowrap"
                                                style={{ backgroundColor: qrColor, fontSize: `clamp(10px, ${qrScale * 0.025}vw, 24px)` }}>
                                                {t.scanMe}
                                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ backgroundColor: qrColor }}></div>
                                            </div>
                                        )}

                                        {/* bubble-top */}
                                        {frameType === 'bubble-top' && (
                                            <div className="absolute -top-[18%] left-1/2 -translate-x-1/2 bg-black text-white px-[1em] py-[0.35em] rounded-full font-bold shadow-sm whitespace-nowrap"
                                                style={{ backgroundColor: qrColor, fontSize: `clamp(10px, ${qrScale * 0.025}vw, 24px)` }}>
                                                {t.scanMe}
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ backgroundColor: qrColor }}></div>
                                            </div>
                                        )}

                                        {/* box-top */}
                                        {frameType === 'box-top' && (
                                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-md font-bold shadow-sm whitespace-nowrap"
                                                style={{ backgroundColor: qrColor, fontSize: 'clamp(8px, 1.5vw, 18px)' }}>
                                                {t.scanMe}
                                            </div>
                                        )}

                                        {/* box-bottom */}
                                        {frameType === 'box-bottom' && (
                                            <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-md font-bold shadow-sm whitespace-nowrap"
                                                style={{ backgroundColor: qrColor, fontSize: 'clamp(8px, 1.5vw, 18px)' }}>
                                                {t.scanMe}
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>

                            {/* Grid Overlay for alignment (visible on hover) */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:25%_25%]"></div>
                        </div>

                        <div className="p-6 bg-white border-t border-slate-100">
                            <button
                                onClick={handleDownload}
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {loading ? t.processing : <><Download size={20} /> {t.downloadHq}</>}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        .input-modern {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          outline: none;
          transition: all 0.2s;
          font-size: 0.95rem;
        }
        .input-modern:focus {
          border-color: #6366f1;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        input[type=range] {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 5px;
          outline: none;
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          transition: background .15s ease-in-out;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        input[type=range]::-webkit-slider-thumb:hover {
          background: #4338ca;
          transform: scale(1.1);
        }
      `}</style>
        </div >
    );
}

// Sub Components
function TabButton({ active, onClick, icon, label }) {
    return (
        <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${active ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {icon} {label}
        </button>
    );
}

function ColorBtn({ color, setColor, activeColor }) {
    return (
        <button
            onClick={() => setColor(color)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeColor === color ? 'border-slate-400 scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
        >
            {activeColor === color && <Check size={12} className="text-white mix-blend-difference" />}
        </button>
    )
}

function ControlSlider({ icon, label, value, onChange, min, max }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-24 text-xs font-bold text-slate-500 flex items-center gap-2">
                {icon} {label}
            </div>
            <input
                type="range"
                min={min} max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="flex-1"
            />
            <span className="text-xs font-mono text-slate-400 w-8 text-right">{value}%</span>
        </div>
    )
}

function FrameOption({ active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={`py-2 text-xs font-semibold rounded-lg border transition-all ${active ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
            {label}
        </button>
    )
}

function IconOption({ selected, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${selected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}
        >
            {icon}
        </button>
    )
}
