/**
 * 初始化变量和获取DOM元素
 */
const lightSource = document.getElementById('lightSource');
const colorTempSlider = document.getElementById('colorTemp');
const brightnessSlider = document.getElementById('brightness');
const colorTempValue = document.getElementById('colorTempValue');
const brightnessValue = document.getElementById('brightnessValue');
const colorMode = document.getElementById('colorMode');
const colorPicker = document.getElementById('colorPicker');
const temperatureControls = document.getElementById('temperatureControls');
const colorControls = document.getElementById('colorControls');

/**
 * 将色温转换为RGB颜色值，增强亮度
 * @param {number} temp - 色温值（开尔文）
 * @returns {string} RGB颜色值
 */
function colorTemperatureToRGB(temp) {
    // 基础色温到RGB的转换
    function baseColorTemp(temp) {
        if (temp <= 6600) {
            const r = 255;
            const g = temp / 100;
            const b = temp <= 1900 ? 0 : (temp - 2000) / 100;
            return [r, g, b];
        } else {
            const r = Math.min(255, (temp - 6000) / 10);
            const g = Math.min(255, (temp - 5000) / 10);
            const b = 255;
            return [r, g, b];
        }
    }

    let [r, g, b] = baseColorTemp(temp);
    const enhanceFactor = 2.5;
    r = Math.min(255, r * enhanceFactor);
    g = Math.min(255, g * enhanceFactor);
    b = Math.min(255, b * enhanceFactor);

    const minBrightness = 100;
    r = Math.max(minBrightness, r);
    g = Math.max(minBrightness, g);
    b = Math.max(minBrightness, b);

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * 更新光源显示
 */
function updateLight() {
    const brightness = brightnessSlider.value;
    const minOpacity = 0.2;
    const opacity = minOpacity + (brightness / 100) * (1 - minOpacity);
    
    let color;
    if (colorMode.value === 'temperature') {
        color = colorTemperatureToRGB(colorTempSlider.value);
    } else {
        color = colorPicker.value;
    }
    
    lightSource.style.backgroundColor = color;
    lightSource.style.opacity = opacity;
    
    if (colorMode.value === 'temperature') {
        colorTempValue.textContent = `${colorTempSlider.value}K`;
    }
    brightnessValue.textContent = `${brightness}%`;
}

/**
 * 切换颜色模式
 */
function toggleColorMode() {
    if (colorMode.value === 'temperature') {
        temperatureControls.style.display = 'flex';
        colorControls.style.display = 'none';
    } else {
        temperatureControls.style.display = 'none';
        colorControls.style.display = 'flex';
    }
    updateLight();
}

// 添加事件监听器
colorMode.addEventListener('change', toggleColorMode);
colorTempSlider.addEventListener('input', updateLight);
brightnessSlider.addEventListener('input', updateLight);
colorPicker.addEventListener('input', updateLight);

// 初始化光源显示
updateLight(); 