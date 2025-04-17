(() => {
    function g(e) {
        return Array.isArray(e) ? e[Math.floor(Math.random() * e.length)] : e
    }

    function L(e) {
        let o = document.createElement("a"),
            t = window.URL.createObjectURL(e);
        o.href = t, o.download = "live2d.png", o.click(), URL.revokeObjectURL(t)
    }
    var p;

    function D(e, o, t) {
        if (!e || sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > t) return;
        p && (clearTimeout(p), p = null), e = g(e), sessionStorage.setItem("waifu-text", t);
        let c = document.getElementById("waifu-tips");
        c.innerHTML = e, c.classList.add("waifu-tips-active"), p = setTimeout(() => {
            sessionStorage.removeItem("waifu-text"), c.classList.remove("waifu-tips-active")
        }, o)
    }
    var a = D;
    var v = class {
        constructor(o) {
            let {
                cdnPath: t,
                switchType: c
            } = o;
            this.cdnPath = t, this.isOrderSwitch = c === "order"
        }
        async loadModelList() {
            let o = await fetch(`${this.cdnPath}model_list.json`);
            this.modelList = await o.json(), console.log()
        }
        async loadModel(o, t, c) {
            localStorage.setItem("modelId", o), localStorage.setItem("modelTexturesId", t), this.modelList || await this.loadModelList(), a(c, 4e3, 10);
            let s = this.modelList.models[o][t];
            if (s === void 0) {
                if (parseInt(o) === 0 && parseInt(t) === 0) return;
                await this.loadModel(0, 0, this.modelList.messages[0][0]);
                return
            }
            window.live2d.loadModel(`${this.cdnPath}model/` + s + "/")
        }
        async switchTextures() {
            let o = localStorage.getItem("modelId"),
                t = parseInt(localStorage.getItem("modelTexturesId"));
            this.modelList || await this.loadModelList();
            let c = this.modelList.models[o].length;
            if (this.isOrderSwitch) t = (t + 1) % c;
            else {
                let s;
                do s = Math.floor(Math.random() * c); while (s === t);
                t = s
            }
            this.loadModel(o, t, this.modelList.messages[o][t])
        }
        async switchModel() {
            let o = localStorage.getItem("modelId");
            this.modelList || await this.loadModelList();
            let t = ++o >= this.modelList.models.length ? 0 : o;
            this.loadModel(t, 0, this.modelList.messages[t][0])
        }
    }, I = v;
    var M = '<svg t="1744855163211" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18140" width="200" height="200"><path d="M114.0736 546.304l751.1552-371.712-529.0496 444.7232zM951.7568 159.8976L556.0832 678.4l348.8768 58.9312 21.9648-14.592z" fill="#FBC07C" p-id="18141"></path><path d="M874.9056 216.9344l-477.6448 423.5264 99.7888 212.1728 8.6528-186.9312z" fill="#FC9553" p-id="18142"></path><path d="M542.72 888.3712v-185.0368l10.9056-15.104 115.712 17.2544z" fill="#E56234" p-id="18143"></path><path d="M962.4064 96.3072c-1.8432-1.8432-4.0448-3.072-6.3488-3.84-4.0448-1.6896-8.704-1.7408-12.9536 0.2048-7.2192 3.3792-722.5856 339.6096-874.9568 410.368a27.23328 27.23328 0 0 0-15.7696 26.6752 27.09504 27.09504 0 0 0 19.2512 24.2688l253.9008 78.1312 164.4032 312.7296a16.44032 16.44032 0 0 0 14.592 8.8064c0.1024 0 0.2048-0.0512 0.3072-0.0512 0.8192 0.1024 1.6384 0.2048 2.4576 0.2048 5.4272 0 10.6496-2.6112 13.8752-7.2704l148.7872-214.8864c5.888-7.3728 10.2912-13.056 13.5168-17.5104l217.7536 38.0928c3.072 0.9728 6.2976 1.4336 9.472 1.4336 6.1952 0 12.3392-1.792 17.5616-5.3248a31.6928 31.6928 0 0 0 14.0288-25.088l24.7808-611.9424c0.0512-0.768-0.0512-1.536-0.1024-2.2528 0.4608-4.5056-1.024-9.2672-4.5568-12.7488zM852.48 169.216L332.6976 602.2144l-243.712-74.9568C217.1392 467.6096 651.4688 263.6288 852.48 169.216z m-496.9472 453.9904l481.8432-401.408-320.0512 404.7872-24.6272 30.8224-2.3552 4.7104v217.4976l-134.8096-256.4096z m289.8432 89.9584l-124.3648 179.5584v-206.8992l128 22.3744c-1.792 2.4576-3.1744 4.352-3.6352 4.9664z m266.1888 8.96v0.0512c0 0.1536 0 0.4608-0.4096 0.7168-0.3584 0.256-0.6656 0.1536-0.8192 0.1024l-1.3312-0.512-229.5296-40.1408-146.4832-26.0608 7.6288-9.6256L934.5536 153.6l-22.9888 568.5248z" fill="#333333" p-id="18144"></path></svg>';
    var C = '<svg t="1744855275256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21120" width="200" height="200"><path d="M536.953154 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z" fill="#FFE585" p-id="21121"></path><path d="M547.508202 24.443486c-4.200646 0-8.421844 0.078094-12.593718 0.193181 223.698798 6.374953 403.064748 189.699047 403.064748 414.939177 0 229.268148-185.8601 415.132358-415.132358 415.132358-229.255817 0-415.132358-185.86421-415.132358-415.132358 0-36.104184 4.619889-71.143822 13.284236-104.5517-13.958312 43.305292-21.504678 89.483629-21.504679 137.433471 0 247.427106 200.599354 448.014129 448.014129 448.014129 247.431216 0 448.014129-200.587023 448.014129-448.014129 0-247.431216-200.582913-448.014129-448.014129-448.014129z" fill="#FF9900" opacity=".24" p-id="21122"></path><path d="M437.757071 1024h197.290626a16.440885 16.440885 0 0 0 0-32.881771h-197.290626a16.440885 16.440885 0 0 0 0 32.881771z" fill="#6E6E96" opacity=".29" p-id="21123"></path><path d="M708.480912 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM359.112096 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z" fill="#6E6E96" opacity=".17" p-id="21124"></path><path d="M125.931017 487.061232c0-234.948474 190.459438-425.407911 425.407912-425.407912 229.851799 0 417.092934 182.300648 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651 0-247.427106-200.599354-448.014129-448.014129-448.014129-247.431216 0-448.014129 200.587023-448.014129 448.014129 0 205.954972 138.983025 379.435085 328.308042 431.819856-164.955514-58.558324-283.095607-215.955141-283.095607-400.993196z" fill="#FFEFB5" p-id="21125"></path><path d="M244.531455 452.979276c-4.151324 144.252329 45.985157 270.925241 166.768122 304.933213 120.778855 34.007972 274.945038-35.121842 346.688951-160.331515L244.531455 452.979276z" fill="#C7A17B" p-id="21126"></path><path d="M228.09468 452.506601c-4.841841 168.264242 61.982138 288.35258 178.749417 321.234351 129.956979 36.593301 290.465234-37.189283 365.406899-167.984748a16.449106 16.449106 0 0 0-9.815208-23.999582l-513.448853-144.601698a16.436775 16.436775 0 0 0-20.892255 15.351677z m515.62727 136.903253c-66.66368 116.348036-213.789054 184.836655-327.962783 152.678283-146.019724-41.114544-156.89537-215.544119-154.790937-288.636185a16.453216 16.453216 0 0 1-20.892255 15.351677l513.457073 144.605808a16.444996 16.444996 0 0 1-9.811098-23.999583z" fill="#6E6E96" p-id="21127"></path><path d="M313.065286 97.954796C381.340173 55.385233 460.182439 32.881771 541.063375 32.881771c115.275268 0 223.649475 44.891838 305.163386 126.405748 81.51802 81.51391 126.409858 189.892227 126.409858 305.167495 0 237.969486-193.607867 431.573243-431.573244 431.573244-237.969486 0-431.573243-193.603757-431.573243-431.573244 0-51.965529 9.132912-102.767865 27.139792-151.005422a16.440885 16.440885 0 0 0-30.80611-11.49629C86.44001 353.877729 76.608361 408.551894 76.608361 464.455014c0 256.107893 208.347121 464.455014 464.455014 464.455015 256.103783 0 464.455014-208.347121 464.455015-464.455015 0-124.058811-48.315652-240.694563-136.044217-328.419017C781.753828 48.311542 665.122187 0 541.063375 0 454.025328 0 369.165697 24.225645 295.666719 70.054613a16.440885 16.440885 0 0 0 17.398567 27.900183z" fill="#6E6E96" p-id="21128"></path><path d="M451.727714 273.078997m-36.991992 0a36.991992 36.991992 0 1 0 73.983984 0 36.991992 36.991992 0 1 0-73.983984 0Z" fill="#6E6E96" p-id="21129"></path><path d="M711.016919 341.049728m-36.991993 0a36.991992 36.991992 0 1 0 73.983985 0 36.991992 36.991992 0 1 0-73.983985 0Z" fill="#6E6E96" p-id="21130"></path><path d="M219.37279 277.008369c9.342533-28.442732 38.393578-63.326181 64.682553-77.646192l0.098646-0.061653c26.420503-14.274799 26.420503-37.579754 0-51.821671l-0.098646-0.086315C257.762257 133.13829 227.190431 101.0128 216.117495 76.039095c-11.052385-25.014807-29.174351-25.014807-40.255509 0-11.035944 25.006587-41.636542 57.115636-68.052935 71.349333l-0.123306 0.098645c-26.342409 14.254248-26.342409 37.542762 0 51.829892l0.123306 0.049322c26.416393 14.258358 55.393453 49.19524 64.662003 77.637972l6.658558 20.123644c9.301431 28.467393 24.32018 28.467393 33.679154 0l6.564024-20.119534z" fill="#CFD3FF" p-id="21131"></path><path d="M234.991631 282.137925c8.101246-24.648998 34.16827-55.944223 56.930676-68.33654l0.300046-0.164409 0.291826-0.17674-0.542549 0.304157c18.080864-9.765886 28.446842-24.492809 28.438621-40.403476-0.00411-15.902446-10.374199-30.608819-28.450952-40.358264l3.058005 2.129095-1.393365-1.224846a48.891083 48.891083 0 0 0-1.730403-0.974123c-23.235081-12.593718-51.048949-41.702306-60.744962-63.560463-10.970181-24.821627-26.724659-28.533157-35.138282-28.537267s-24.172212 3.699199-35.183495 28.541377c-9.65902 21.882819-37.50577 50.970855-60.818946 63.535802l-1.331712 0.719289-1.183743 0.953571 2.371597-1.561884c-18.023321 9.753555-28.360527 24.455817-28.368747 40.341823-0.00822 15.894226 10.328986 30.617039 28.352307 40.399366l0.92891 0.501447 0.982342 0.37814-1.755064-0.817934c22.750075 12.277231 48.784217 43.539575 56.848472 68.266667l6.679109 20.193517c8.799984 26.938391 22.47469 32.618717 32.400875 32.626938s23.625552-5.647444 32.507741-32.655709l6.551693-20.119534z m-37.793485 9.860421c-2.947029 8.956172-5.478925 11.278447-5.507697 11.298999 1.878371-1.66464 6.666779-1.656419 8.54104 0.00822-0.028772-0.020551-2.548337-2.338716-5.466594-11.278447l-6.67911-20.185297c-10.604371-32.520071-42.446256-70.73691-72.471423-86.939403l-0.908359-0.493226-0.965902-0.37403 1.783836 0.834375c-7.706665-4.180095-11.155141-8.779433-11.155141-11.479849 0-2.696305 3.444366-7.279202 11.1387-11.438746l1.323491-0.715178 1.171413-0.945351-2.396259 1.574215c29.692239-16.001092 62.76308-50.781785 75.291035-79.187525 3.34983-7.562807 6.198214-9.145243 6.226986-9.157573a3.312838 3.312838 0 0 1-2.268843 0c0.028772 0.012331 2.868935 1.594766 6.218765 9.169903 12.585498 28.372858 45.590575 63.13711 75.143067 79.158754l-3.021012-2.112654 1.409806 1.237177c0.094535 0.086315 1.750954 0.978233 1.750954 0.978232 7.718996 4.159544 11.175692 8.738331 11.175692 11.426416 0 2.696305-3.456696 7.283312-11.188023 11.459297l-0.324707 0.172629-0.320598 0.18907 0.497337-0.279495c-29.963514 16.317579-61.780737 54.509756-72.442651 86.951733l-6.555803 20.127754z" fill="#6E6E96" p-id="21132"></path><path d="M260.791491 594.53119s251.730508-113.355795 386.081313 118.867602c0 0 111.115724-89.820668 111.115724-115.809597L244.531455 452.979276s-29.030494 96.269605 16.260036 141.551914z" fill="#6E6E96" opacity=".25" p-id="21133"></path></svg>';
    var x = '<svg t="1744855663756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37456" width="200" height="200"><path d="M673.39 430.91H617.4c-8.88 0-24.72-18.95-20.5-26.76 25.97-47.94 43.94-72.9 34.95-138.82-8.05-59.06-56.09-108.86-139.82-108.86s-122.31 51.31-122.31 134.87c0 50.5 24.58 95.26 62.42 122.98 7.17 5.25 3.49 16.59-5.39 16.59h-125.9c-42.56 0-77.06 34.5-77.06 77.06s34.5 77.06 77.06 77.06h95.3c6.84 0 11.28 7.22 8.18 13.33l-95.25 187.66c-18.8 37.03-3.18 82.27 34.46 99.82 37.67 17.56 82.39 0.41 98.65-37.84l64.11-150.83c5.91-13.91 25.62-13.91 31.53 0L601.94 848c16.26 38.25 60.98 55.4 98.65 37.84l-4.83-6.32c8.99-9.99 26.14-24.53 7.35-61.56l-88.24-210.08c-4.99-16.98 4.99-38.95 26.96-38.95l31.55 3c42.56 0 77.06-21.39 77.06-63.95s-34.5-77.06-77.06-77.06z" fill="#F49C00" p-id="37457"></path><path d="M644.84 448.09h-62.92c-25.97 0-31.96-16.98-22.97-30.96 31.77-49.41 46.94-97.87 42.94-138.82-9.99-96.87-63.08-123.84-146.81-123.84-33.96 3.99-85.79 53.53-85.79 137.09 0 50.5 24.58 95.26 62.42 122.98 7.17 5.25 3.49 16.59-5.39 16.59h-125.9c-42.56 0-77.06 34.5-77.06 77.06s34.5 77.06 77.06 77.06h95.3c6.84 0 11.28 7.22 8.18 13.33l-95.25 187.66c-18.8 37.03-3.18 82.27 34.46 99.82 37.67 17.56 82.39 0.41 98.65-37.84l64.11-150.83c5.91-13.91 25.62-13.91 31.53 0l64.11 150.83c16.26 38.25 30.62 59.85 68.28 42.29l4.99-2c3-6.99 21.97-10.99 9.99-44.94l-84.89-232.69c-6.99-24.97 8.99-44.94 30.96-44.94h17.98c42.56 0 65.91-15.36 65.91-57.92s-27.35-59.92-69.91-59.92z" fill="#FEB407" p-id="37458"></path><path d="M669.61 910.29c-11 0-22.02-2.03-32.63-6.1-23.24-8.91-41.4-26.44-51.13-49.34l-63.77-150.02-63.77 150.02c-9.74 22.91-27.9 40.43-51.13 49.34-23.24 8.91-48.46 8.03-71.02-2.49-22.54-10.51-39.42-29.25-47.54-52.76-8.12-23.51-6.39-48.67 4.87-70.85l89.11-175.56h-81.74c-52.14 0-94.56-42.42-94.56-94.56s42.42-94.56 94.56-94.56h103.15c-13.2-12.79-24.35-27.7-32.79-43.97-12.42-23.95-18.98-50.95-18.98-78.09 0-45.03 17.44-87.46 49.11-119.46 31.65-31.98 73.84-49.87 118.8-50.37 45.38-0.53 88.38 17.03 121.08 49.37 32.7 32.33 50.7 75.12 50.7 120.47 0 27.14-6.57 54.15-18.99 78.09-8.44 16.27-19.59 31.18-32.79 43.97H743.3c52.14 0 94.56 42.42 94.56 94.56s-42.42 94.56-94.56 94.56h-81.74l89.11 175.56c11.26 22.18 12.99 47.34 4.87 70.85-8.12 23.51-25 42.24-47.54 52.76-12.26 5.72-25.3 8.59-38.38 8.59zM522.07 669.25c13.92 0 26.43 8.28 31.87 21.08l64.11 150.83c5.99 14.09 17.16 24.87 31.46 30.36 14.3 5.48 29.81 4.94 43.69-1.53 13.87-6.47 24.25-17.99 29.25-32.46 4.99-14.46 3.93-29.94-3-43.59L624.2 606.28c-4.23-8.33-3.84-18.06 1.05-26.03 4.89-7.96 13.39-12.72 22.73-12.72h95.3c32.84 0 59.56-26.72 59.56-59.56s-26.72-59.56-59.56-59.56h-125.9c-11.57 0-21.75-7.38-25.34-18.37-3.6-11 0.26-22.99 9.61-29.83 34.6-25.34 55.26-66.04 55.27-108.86 0-35.93-14.32-69.88-40.31-95.58-26.01-25.72-60.14-39.66-96.08-39.26-35.69 0.4-69.19 14.6-94.31 39.99-25.14 25.41-38.99 59.09-38.99 94.85 0 42.82 20.66 83.51 55.26 108.86 9.35 6.85 13.21 18.84 9.61 29.84a26.61 26.61 0 0 1-25.34 18.37h-125.9c-32.84 0-59.56 26.72-59.56 59.56s26.72 59.56 59.56 59.56h95.3c9.35 0 17.84 4.75 22.73 12.72 4.89 7.96 5.28 17.69 1.05 26.03l-95.25 187.66c-6.93 13.64-7.99 29.12-3 43.59 4.99 14.46 15.38 25.99 29.25 32.46 13.88 6.47 29.39 7.01 43.69 1.53s25.47-16.26 31.46-30.36l64.11-150.83a34.56 34.56 0 0 1 31.87-21.08z" fill="#333333" p-id="37459"></path><path d="M518.25 590.12m-20.72 0a20.72 20.72 0 1 0 41.44 0 20.72 20.72 0 1 0-41.44 0Z" fill="#FFFFFF" p-id="37460"></path><path d="M518.25 506.23m-20.72 0a20.72 20.72 0 1 0 41.44 0 20.72 20.72 0 1 0-41.44 0Z" fill="#FFFFFF" p-id="37461"></path><path d="M461.33 266.55m-20.72 0a20.72 20.72 0 1 0 41.44 0 20.72 20.72 0 1 0-41.44 0Z" fill="#FFFFFF" p-id="37462"></path><path d="M575.18 266.55m-20.72 0a20.72 20.72 0 1 0 41.44 0 20.72 20.72 0 1 0-41.44 0Z" fill="#FFFFFF" p-id="37463"></path><path d="M518.5 383.5c-21.71 0-37.07-6.29-53-21.7-6.95-6.72-7.14-17.8-0.42-24.75 6.72-6.95 17.8-7.13 24.75-0.42 9.51 9.2 15.95 11.86 28.68 11.86 13.69 0 20.89-4.36 28.7-11.88 6.96-6.71 18.04-6.5 24.74 0.46 6.71 6.96 6.5 18.04-0.46 24.74-15.55 14.99-31.9 21.68-52.98 21.68z" fill="#FFFFFF" p-id="37464"></path></svg>';
    var S = '<svg t="1744855495865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22193" width="200" height="200"><path d="M756.4288 708.8128m-192.5632 0a192.5632 192.5632 0 1 0 385.1264 0 192.5632 192.5632 0 1 0-385.1264 0Z" fill="#ffa115" p-id="22194"></path><path d="M494.7456 324.096c0-123.136-100.1984-223.2832-223.2832-223.2832S48.128 200.96 48.128 324.096c0 112.6912 83.968 206.1312 192.5632 221.1328v133.3248h-141.824c-16.9472 0-30.72 13.7728-30.72 30.72s13.7728 30.72 30.72 30.72h141.824v136.3968c0 16.9472 13.7728 30.72 30.72 30.72s30.72-13.7728 30.72-30.72v-136.3968H444.416c16.9472 0 30.72-13.7728 30.72-30.72s-13.7728-30.72-30.72-30.72H302.1312V545.28c108.6464-15.0528 192.6144-108.4416 192.6144-221.184z m-385.1776 0c0-89.2416 72.6016-161.8432 161.8432-161.8432S433.3056 234.8544 433.3056 324.096 360.6528 485.9904 271.4112 485.9904 109.568 413.3888 109.568 324.096zM787.1488 487.68V209.0496l120.3712 114.6368a30.54592 30.54592 0 0 0 21.1968 8.4992c8.0896 0 16.2304-3.1744 22.272-9.5232 11.7248-12.288 11.2128-31.744-1.0752-43.4176l-178.432-169.9328a30.6432 30.6432 0 0 0-43.008 0.6656l-168.0384 169.9328a30.73024 30.73024 0 0 0 0.256 43.4688c12.032 11.9296 31.488 11.8272 43.4688-0.256l121.6-122.9824v287.6416c-108.6464 15.0016-192.6144 108.4416-192.6144 221.1328 0 123.136 100.1984 223.2832 223.3344 223.2832 123.136 0 223.2832-100.1984 223.2832-223.2832-0.0512-112.7936-83.968-206.1824-192.6144-221.2352z m-30.72 383.0272c-89.2416 0-161.8944-72.6016-161.8944-161.8432s72.6016-161.8944 161.8944-161.8944 161.8432 72.6016 161.8432 161.8944-72.6016 161.8432-161.8432 161.8432z" fill="#474A54" p-id="22195"></path></svg>';
    var F = '<svg t="1744857263943" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="85961" width="200" height="200"><path d="M522.1376 512m-152.8832 0a152.8832 152.8832 0 1 0 305.7664 0 152.8832 152.8832 0 1 0-305.7664 0Z" fill="#ffa115" p-id="85962"></path><path d="M512.256 888.7808c-129.5872 0-241.7152-45.312-333.312-134.6048-74.3424-72.4992-115.6608-156.4672-133.6832-200.0896-11.4176-27.648-10.9056-59.0848 1.4336-86.272 18.9952-41.7792 53.1968-104.0896 108.3904-163.6352 11.52-12.4416 30.976-13.1584 43.4176-1.6384a30.68928 30.68928 0 0 1 1.6384 43.4176c-52.224 56.32-83.5072 116.4288-97.4848 147.2512a47.30368 47.30368 0 0 0-0.6144 37.4272c36.864 89.1904 150.6304 296.704 410.1632 296.704 60.416 0 117.0432-11.4176 168.3456-33.9456a30.7712 30.7712 0 0 1 40.4992 15.7696 30.7712 30.7712 0 0 1-15.7696 40.4992c-59.136 26.0096-124.0576 39.1168-193.024 39.1168zM857.4464 727.0912a30.7456 30.7456 0 0 1-23.4496-50.5856c47.7184-56.4224 75.776-115.3024 88.2176-145.3568 5.0688-12.1856 4.7616-26.0096-0.8704-37.888-40.2432-85.504-160.9728-284.416-411.6992-284.416-53.5552 0-104.448 9.216-151.296 27.392-15.8208 6.144-33.6384-1.6896-39.7312-17.5104-6.144-15.8208 1.6896-33.6384 17.5104-39.7312 53.9648-20.9408 112.3328-31.5392 173.5168-31.5392 124.8768 0 235.1616 43.1104 327.8336 128.1024 75.52 69.2736 119.808 149.76 139.4688 191.5904 12.9536 27.5456 13.7216 59.4432 2.048 87.6032-16.896 40.7552-47.616 101.8368-98.0992 161.4848a30.78656 30.78656 0 0 1-23.4496 10.8544zM857.4464 868.864c-7.68 0-15.36-2.8672-21.3504-8.6016L165.5296 213.1968a30.72 30.72 0 0 1-0.768-43.4176 30.72 30.72 0 0 1 43.4176-0.768l670.6176 647.0656a30.72 30.72 0 0 1 0.768 43.4176 30.6688 30.6688 0 0 1-22.1184 9.3696z" fill="#474A54" p-id="85963"></path><path d="M672.9728 568.1664c-1.6896 0-3.3792-0.1536-5.12-0.4096a30.76096 30.76096 0 0 1-25.2416-35.3792c1.1264-6.7072 1.6896-13.568 1.6896-20.3776 0-67.3792-54.8352-122.1632-122.1632-122.1632-7.5776 0-15.1552 0.7168-22.528 2.048a30.72 30.72 0 0 1-35.84-24.576 30.72 30.72 0 0 1 24.576-35.84c11.0592-2.048 22.4256-3.1232 33.792-3.1232 101.2224 0 183.6032 82.3808 183.6032 183.6032 0 10.24-0.8704 20.48-2.5088 30.5152a30.72512 30.72512 0 0 1-30.2592 25.7024zM522.1376 695.6032c-101.2224 0-183.6032-82.3808-183.6032-183.6032 0-9.5232 0.7168-19.0976 2.2016-28.416 2.6112-16.7424 18.3296-28.2624 35.072-25.6512 16.7424 2.6112 28.2624 18.3296 25.6512 35.072-0.9728 6.2464-1.4848 12.6464-1.4848 18.9952 0 67.3792 54.784 122.1632 122.1632 122.1632 7.8336 0 15.7184-0.768 23.3472-2.2016 16.64-3.2256 32.768 7.68 35.9936 24.32 3.2256 16.64-7.68 32.768-24.32 35.9936-11.52 2.2016-23.296 3.328-35.0208 3.328z" fill="#474A54" p-id="85964"></path></svg>';
    var U = {
         aikey: { 
    icon: '<svg t="1744818851913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7083" width="48" height="48"><path d="M653.2096 828.9792H490.752l-180.48 86.528 0.6144-86.528c-86.3232 0-156.2624-73.4208-156.2624-163.9936v-150.3232c0-90.5728 69.9392-163.9936 156.2624-163.9936h342.3232c86.3232 0 156.2624 73.4208 156.2624 163.9936v150.3232c0 90.5728-69.9392 163.9936-156.2624 163.9936z" fill="#FFF7E6" p-id="7084"></path><path d="M649.6768 299.3664H278.4256s-10.4448-162.0992 120.2688-162.0992h432.6912s120.576 12.5952 120.576 139.0592v197.5808s-20.5824 136.7552-142.4896 136.7552V471.552s-8.8064-172.1856-159.7952-172.1856z" fill="#FD973F" p-id="7085"></path><path d="M948.8896 379.0848c-14.1312 0-25.6-11.4688-25.6-25.6v-12.2368c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v12.2368c0 14.1312-11.4688 25.6-25.6 25.6z" fill="#44454A" p-id="7086"></path><path d="M948.8896 408.6784c-14.1312 0-25.6 11.4688-25.6 25.6v43.008c0 54.6304-38.5024 99.7888-88.2176 106.7008V471.552c0-114.2784-89.1392-207.2064-198.656-207.2064H294.5536v-1.792c0-59.392 45.5168-107.7248 101.4784-107.7248h425.8304c55.9616 0 101.4784 48.3328 101.4784 107.7248 0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6c0-87.6544-68.5056-158.9248-152.6784-158.9248H395.9808c-84.1728 0-152.6784 71.3216-152.6784 158.9248v2.3552c-103.0656 7.4752-184.7808 97.28-184.7808 206.6432v166.5024c0 105.1648 75.4688 192.256 172.9024 205.4656l-0.512 71.7824c-0.0512 8.8064 4.4544 17.0496 11.8784 21.8112 4.1472 2.6624 8.96 3.9936 13.7216 3.9936 3.7888 0 7.5776-0.8192 11.0592-2.5088l194.6112-93.3376h174.1312c109.568 0 198.656-92.9792 198.656-207.2064v-2.4064c77.9776-7.0144 139.4176-75.3152 139.4176-158.3104v-43.008a25.46688 25.46688 0 0 0-25.4976-25.6512z m-165.0176 229.3248c0 86.016-66.1504 156.0064-147.456 156.0064H456.448c-3.84 0-7.6288 0.8704-11.0592 2.5088l-162.9184 78.1312 0.4096-54.8352a25.63072 25.63072 0 0 0-25.6-25.8048c-81.3056 0-147.5072-69.9904-147.5072-156.0064V471.552c0-86.016 66.1504-156.0064 147.5072-156.0064h379.136c81.3056 0 147.456 69.9904 147.456 156.0064v166.4512z" fill="#44454A" p-id="7087"></path><path d="M263.9872 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z" fill="#44454A" p-id="7088"></path><path d="M404.8896 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z" fill="#44454A" p-id="7089"></path><path d="M547.072 559.616a38.3488 36.5568 90 1 0 73.1136 0 38.3488 36.5568 90 1 0-73.1136 0Z" fill="#44454A" p-id="7090"></path></svg>',
    callback: () => {
        // 检查是否已存在模态框
        const existingModal = document.getElementById('ai-modal-container');
        if (existingModal) {
            existingModal.style.display = 'flex'; // 显示已存在的模态框
            return;
        }

        // 从本地存储获取之前保存的位置和大小
        const savedState = localStorage.getItem('aiModalState');
        let initialState = {
            width: '800px',
            height: '600px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };
        
        if (savedState) {
            try {
                initialState = JSON.parse(savedState);
            } catch (e) {
                console.error('Failed to parse saved state:', e);
            }
        }

        // 创建模态框容器
        const modalContainer = document.createElement('div');
        modalContainer.id = 'ai-modal-container';
        modalContainer.style.position = 'fixed';
        modalContainer.style.top = '0';
        modalContainer.style.left = '0';
        modalContainer.style.width = '100%';
        modalContainer.style.height = '100%';
        modalContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalContainer.style.display = 'flex';
        modalContainer.style.zIndex = '9999';

        // 创建模态框内容
        const modal = document.createElement('div');
        modal.id = 'ai-modal';
        modal.style.position = 'absolute';
        modal.style.width = initialState.width;
        modal.style.height = initialState.height;
        modal.style.left = initialState.left;
        modal.style.top = initialState.top;
        if (initialState.transform) {
            modal.style.transform = initialState.transform;
        }
        modal.style.backgroundColor = 'white';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.overflow = 'hidden';
        modal.style.resize = 'both';
        modal.style.minWidth = '300px';
        modal.style.minHeight = '200px';
        modal.style.cursor = 'default';

        // 创建标题栏
        const header = document.createElement('div');
        header.style.padding = '12px 16px';
        header.style.backgroundColor = '#f8f9fa';
        header.style.borderBottom = '1px solid #dee2e6';
        header.style.cursor = 'move';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.userSelect = 'none';

        const title = document.createElement('h3');
        title.textContent = 'AI助手';
        title.style.margin = '0';
        title.style.fontSize = '16px';
        title.style.fontWeight = '600';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '0 8px';

        // 创建iframe - 注意这里src保持不变
        const iframe = document.createElement('iframe');
        iframe.src = 'https://ai.fago.top';
        iframe.style.flex = '1';
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.id = 'ai-iframe'; // 给iframe添加ID以便后续操作

        // 组装模态框
        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);
        modal.appendChild(iframe);
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);

        // 拖动功能实现
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = modal.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            modal.style.transform = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            const maxX = window.innerWidth - modal.offsetWidth;
            const maxY = window.innerHeight - modal.offsetHeight;
            
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            modal.style.left = newX + 'px';
            modal.style.top = newY + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            saveModalState();
        });

        // 大小改变监听
        const resizeObserver = new ResizeObserver(() => {
            saveModalState();
        });
        resizeObserver.observe(modal);

        // 保存状态到本地存储
        function saveModalState() {
            const state = {
                width: modal.style.width,
                height: modal.style.height,
                left: modal.style.left,
                top: modal.style.top,
                transform: modal.style.transform
            };
            localStorage.setItem('aiModalState', JSON.stringify(state));
        }

        // 关闭功能 - 改为隐藏而不是移除
        closeBtn.addEventListener('click', () => {
            saveModalState();
            modalContainer.style.display = 'none'; // 隐藏而不是移除
        });

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                saveModalState();
                modalContainer.style.display = 'none'; // 隐藏而不是移除
            }
        });

        // 防止iframe点击事件冒泡
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 窗口大小变化时调整位置
        window.addEventListener('resize', () => {
            if (modalContainer.style.display !== 'none') {
                const rect = modal.getBoundingClientRect();
                if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                    const maxX = window.innerWidth - modal.offsetWidth;
                    const maxY = window.innerHeight - modal.offsetHeight;
                    const newX = Math.min(parseInt(modal.style.left) || 0, maxX);
                    const newY = Math.min(parseInt(modal.style.top) || 0, maxY);
                    
                    modal.style.left = Math.max(0, newX) + 'px';
                    modal.style.top = Math.max(0, newY) + 'px';
                    saveModalState();
                }
            }
        });
    }
},
        asteroids: {
            icon: M,
            callback: () => {
                if (window.Asteroids) window.ASTEROIDSPLAYERS || (window.ASTEROIDSPLAYERS = []), window.ASTEROIDSPLAYERS.push(new Asteroids);
                else {
                    let e = document.createElement("script");
                    e.src = "https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js", document.head.appendChild(e)
                }
            }
        },
        express: {
            icon: C,
            callback: () => {
                window.live2d.randomExpression()
            }
        },
        "switch-model": {
            icon: S,
            callback: () => {}
        },
        "switch-texture": {
            icon: x,
            callback: () => {}
        },
        quit: {
            icon: F,
            callback: () => {
                localStorage.setItem("waifu-display", Date.now()), a("愿你在算法的世界里披荆斩棘！", 2e3, 11), document.getElementById("waifu").style.bottom = "-500px", setTimeout(() => {
                    document.getElementById("waifu").style.display = "none", document.getElementById("waifu-toggle").classList.add("waifu-toggle-active")
                }, 3e3)
            }
        }
    }, u = U;

    function E(e) {
        let o = new I(e);
        localStorage.removeItem("waifu-display"), sessionStorage.removeItem("waifu-text"), document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
            <div id="waifu-tips"></div>
            <canvas id="live2d" width="800" height="800"></canvas>
            <div id="waifu-tool"></div>
        </div>`), setTimeout(() => {
            document.getElementById("waifu").style.bottom = 0
        }, 0), function() {
            u["switch-model"].callback = () => o.switchModel(), u["switch-texture"].callback = () => o.switchTextures(), Array.isArray(e.tools) || (e.tools = Object.keys(u));
            for (let i of e.tools)
                if (u[i]) {
                    let {
                        icon: l,
                        callback: m
                    } = u[i];
                    document.getElementById("waifu-tool").insertAdjacentHTML("beforeend", `<span id="waifu-tool-${i}">${l}</span>`), document.getElementById(`waifu-tool-${i}`).addEventListener("click", m)
                }
        }();

        function t(s) {
            A = s;
            let i = !1,
                l, m = s.message.default;
            window.addEventListener("mousemove", () => i = !0), window.addEventListener("keydown", () => i = !0), setInterval(() => {
                i ? (i = !1, clearInterval(l), l = null) : l || (l = setInterval(() => {
                    a(m, 6e3, 9)
                }, 2e4))
            }, 1e3), a(H(), 7e3, 11), window.addEventListener("mouseover", w => {
                for (let {
                        selector: d,
                        text: n
                    } of s.mouseover)
                    if (w.target.closest(d)) {
                        n = g(n), n = n.replace("{text}", w.target.innerText), a(n, 4e3, 8);
                        return
                    }
            }), window.addEventListener("click", w => {
                for (let {
                        selector: d,
                        text: n
                    } of s.click)
                    if (w.target.closest(d)) {
                        n = g(n), n = n.replace("{text}", w.target.innerText), a(n, 4e3, 8);
                        return
                    }
            }), s.seasons.forEach(({
                date: w,
                text: d
            }) => {
                let n = new Date,
                    f = w.split("-")[0],
                    r = w.split("-")[1] || f;
                f.split("/")[0] <= n.getMonth() + 1 && n.getMonth() + 1 <= r.split("/")[0] && f.split("/")[1] <= n.getDate() && n.getDate() <= r.split("/")[1] && (d = g(d), d = d.replace("{year}", n.getFullYear()), m.push(d))
            });
            let h = () => {};
            console.log("%c", h), h.toString = () => {
                a(s.message.console, 6e3, 9)
            }, window.addEventListener("copy", () => {
                a(s.message.copy, 6e3, 9)
            }), window.addEventListener("visibilitychange", () => {
                document.hidden || a(s.message.visibilitychange, 6e3, 9)
            })
        }

        function c() {
            if (e.dragEnable === !1) return;
            let s = document.getElementById("waifu"),
                i = document.getElementById("live2d"),
                l = !1,
                m, h, w, d;
            s.onmousedown = function(f) {
                l = !0, m = s.offsetLeft, h = f.clientX, w = s.offsetTop, d = f.clientY
            };
            let n = !e.dragDirection || e.dragDirection.length === 0;
            window.onmousemove = function(f) {
                if (l) {
                    if (n || e.dragDirection.includes("x")) {
                        let r = m + (f.clientX - h);
                        r < 0 ? r = 0 : r > window.innerWidth - i.clientWidth && (r = window.innerWidth - i.clientWidth), s.style.left = r + "px"
                    }
                    if (n || e.dragDirection.includes("y")) {
                        let r = w + (f.clientY - d);
                        r < 30 ? r = 30 : r > window.innerHeight - i.clientHeight + 10 && (r = window.innerHeight - i.clientHeight + 10), s.style.top = r + "px"
                    }
                }
            }, window.onmouseup = function(f) {
                l = !1
            }
        }(function() {
            let i = localStorage.getItem("modelId"),
                l = localStorage.getItem("modelTexturesId");
            i === null && (i = 0, l = 0), new Promise((m, h) => {
                window.live2d.init(e.cdnPath + "model/"), m()
            }).then(() => {
                o.loadModel(i, l)
            }), fetch(e.waifuPath).then(m => m.json()).then(t).then(c)
        })()
    }

    function B(e, o) {
        typeof e == "string" && (e = {
            waifuPath: e,
            apiPath: o
        }), k = e.homePath, document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
            <span>AI助教</span>
        </div>`);
        let t = document.getElementById("waifu-toggle");
        t.addEventListener("click", () => {
            t.classList.remove("waifu-toggle-active"), t.getAttribute("first-time") ? (E(e), t.removeAttribute("first-time")) : (localStorage.removeItem("waifu-display"), document.getElementById("waifu").style.display = "", setTimeout(() => {
                document.getElementById("waifu").style.bottom = 0
            }, 0))
        }), localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 864e5 ? (t.setAttribute("first-time", !0), setTimeout(() => {
            t.classList.add("waifu-toggle-active")
        }, 0)) : E(e)
    }
    var A = null,
        k = "/";

    function H() {
        if (location.pathname === k)
            for (let {
                    hour: t,
                    text: c
                } of A.time) {
                let s = new Date,
                    i = t.split("-")[0],
                    l = t.split("-")[1] || i;
                if (i <= s.getHours() && s.getHours() <= l) return c
            }
        let e = `欢迎来到<span>\u300C${document.title.split(" - ")[0]}\u300D</span>`,
            o;
        if (document.referrer !== "") {
            let t = new URL(document.referrer),
                c = t.hostname.split(".")[1],
                s = {
                    baidu: "\u767E\u5EA6",
                    so: "360\u641C\u7D22",
                    google: "\u8C37\u6B4C\u641C\u7D22"
                };
            return location.hostname === t.hostname ? e : (c in s ? o = s[c] : o = t.hostname, `Hello\uFF01\u6765\u81EA <span>${o}</span> \u7684\u670B\u53CB<br>${e}`)
        }
        return e
    }

    function z() {
        a(H(), 7e3, 11)
    }
    window.initWidget = B;
    window.showWelcomeMessage = z;
})();

