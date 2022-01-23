<template>
    <div class="header">
        <div>
            <label>image url: </label>
            <input v-model="imageUrl" />
        </div>
        <button @click="generateFromUrl">generate</button>
    </div>
    <div class="header">
        <div>
            <label>upload file: </label>
            <input type="file" @change="handleFile" />
        </div>
    </div>
    <img :src="dataURL" class="image-preview" />
    <div class="preview">
        <div class="preview-content">
            <span class="headline2">Your Theme</span>
            <span class="subtitle1">Light Theme</span>
            <div class="color-scheme">
                <div class="color-family" v-for="(pattle, key) in light" :key="key" :class="key">
                    <div
                        v-for="(item, idx) in pattle"
                        :key="idx"
                        :title="`${item.title} - ${item.bg}`"
                        class="color-item"
                        :style="`background-color: ${item.bg} ;`"
                    >
                        <span
                            class="color-label"
                            :style="`color: ${item.textColor};`"
                        >{{ item.title }}</span>
                    </div>
                </div>
            </div>
            <span class="subtitle1">Dark Theme</span>
            <div class="color-scheme">
                <div class="color-family" v-for="(pattle, key) in dark" :key="key" :class="key">
                    <div
                        v-for="(item, idx) in pattle"
                        :key="idx"
                        :title="`${item.title} - ${item.bg}`"
                        class="color-item"
                        :style="`background-color: ${item.bg} ;`"
                    >
                        <span
                            class="color-label"
                            :style="`color: ${item.textColor};`"
                        >{{ item.title }}</span>
                    </div>
                </div>
            </div>
            <span class="color-info-expand" role="button">More color information</span>
            <div class="tonal-palettes">
                <template v-for="(m, k) in more" :key="k">
                    <span class="subtitle2">{{ k }}</span>

                    <div class="tonal-palettes">
                        <div class="tonal-row">
                            <div
                                v-for="item in m"
                                :key="item.text"
                                class="color-item"
                                :title="`Luminance ${item.text} - ${item.color}`"
                                :style="`background-color: ${item.color};`"
                            >
                                <span
                                    class="color-label"
                                    :style="`color: ${item.text > 50 ? 'black' : 'white'};`"
                                >{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { generatePaletteFromURL } from 'theme-generator'
import { fileToDataURL } from "./utils";
export default {
    data() {
        return {
            fileList: {},
            pallete: {},
            light: {},
            dark: {},
            more: [],
            imageUrl: 'https://files.catbox.moe/g2lwbi.jpg',
            dataURL: '',
        }
    },
    created() {
        this.generateFromUrl()
    },
    methods: {
        async handleFile(e) {
            const { files } = e.target
            console.log(files)
            this.fileList = [...files]
            const URL = await fileToDataURL(files[0])
            this.dataURL = URL
            this.generate()
        },
        async generateFromUrl() {
            this.dataURL = this.imageUrl
            this.generate()
        },
        async generate() {
            if (!this.dataURL) return;
            const url = this.dataURL;
            const palleteinstance = await generatePaletteFromURL(url)
            this.handleResult(palleteinstance.save())
        },
        handleResult(pallete) {
        this.pallete = pallete
            const light = {
                primary: [{
                    bg: pallete.light.primary,
                    title: 'primary',
                    textColor: pallete.light.onPrimary,
                }, {
                    bg: pallete.light.onPrimary,
                    title: 'on primary',
                    textColor: pallete.light.primary,
                }, {
                    bg: pallete.light.primaryContainer,
                    title: 'primary container',
                    textColor: pallete.light.onPrimaryContainer,
                }, {
                    bg: pallete.light.onPrimaryContainer,
                    title: 'on primary container',
                    textColor: pallete.light.primaryContainer,
                }],
                secondary: [{
                    bg: pallete.light.secondary,
                    title: 'secondary',
                    textColor: pallete.light.onSecondary,
                }, {
                    bg: pallete.light.onSecondary,
                    title: 'on secondary',
                    textColor: pallete.light.secondary,
                }, {
                    bg: pallete.light.secondaryContainer,
                    title: 'secondary container',
                    textColor: pallete.light.onSecondaryContainer,
                }, {
                    bg: pallete.light.onSecondaryContainer,
                    title: 'on secondary container',
                    textColor: pallete.light.secondaryContainer,
                }],
                tertiary: [{
                    bg: pallete.light.tertiary,
                    title: 'tertiary',
                    textColor: pallete.light.onTertiary,
                }, {
                    bg: pallete.light.onTertiary,
                    title: 'on secondary',
                    textColor: pallete.light.tertiary,
                }, {
                    bg: pallete.light.tertiaryContainer,
                    title: 'tertiary container',
                    textColor: pallete.light.onTertiaryContainer,
                }, {
                    bg: pallete.light.onTertiaryContainer,
                    title: 'on tertiary container',
                    textColor: pallete.light.tertiaryContainer,
                }],
                error: [{
                    bg: pallete.light.error,
                    title: 'error',
                    textColor: pallete.light.onError,
                }, {
                    bg: pallete.light.onError,
                    title: 'on error',
                    textColor: pallete.light.error,
                }, {
                    bg: pallete.light.errorContainer,
                    title: 'error container',
                    textColor: pallete.light.onErrorContainer,
                }, {
                    bg: pallete.light.onErrorContainer,
                    title: 'on error container',
                    textColor: pallete.light.errorContainer,
                }],
                background: [{
                    bg: pallete.light.background,
                    title: 'background',
                    textColor: pallete.light.onBackground,
                }, {
                    bg: pallete.light.onBackground,
                    title: 'on background',
                    textColor: pallete.light.background,
                }, {
                    bg: pallete.light.surface,
                    title: 'surface',
                    textColor: pallete.light.onSurface,
                }, {
                    bg: pallete.light.onSurface,
                    title: 'on surface',
                    textColor: pallete.light.surface,
                }],
                'surface-variant': [{
                    bg: pallete.light.outline,
                    title: 'outline',
                    textColor: pallete.light.surfaceVariant,
                }, {
                    bg: pallete.light.surfaceVariant,
                    title: 'surface variant',
                    textColor: pallete.light.onSurfaceVariant,
                }, {
                    bg: pallete.light.onSurfaceVariant,
                    title: 'on surface variant',
                    textColor: pallete.light.surfaceVariant,
                }],
            }
            const dark = {
                primary: [{
                    bg: pallete.dark.primary,
                    title: 'primary',
                    textColor: pallete.dark.onPrimary,
                }, {
                    bg: pallete.dark.onPrimary,
                    title: 'on primary',
                    textColor: pallete.dark.primary,
                }, {
                    bg: pallete.dark.primaryContainer,
                    title: 'primary container',
                    textColor: pallete.dark.onPrimaryContainer,
                }, {
                    bg: pallete.dark.onPrimaryContainer,
                    title: 'on primary container',
                    textColor: pallete.dark.primaryContainer,
                }],
                secondary: [{
                    bg: pallete.dark.secondary,
                    title: 'secondary',
                    textColor: pallete.dark.onSecondary,
                }, {
                    bg: pallete.dark.onSecondary,
                    title: 'on secondary',
                    textColor: pallete.dark.secondary,
                }, {
                    bg: pallete.dark.secondaryContainer,
                    title: 'secondary container',
                    textColor: pallete.dark.onSecondaryContainer,
                }, {
                    bg: pallete.dark.onSecondaryContainer,
                    title: 'on secondary container',
                    textColor: pallete.dark.secondaryContainer,
                }],
                tertiary: [{
                    bg: pallete.dark.tertiary,
                    title: 'tertiary',
                    textColor: pallete.dark.onTertiary,
                }, {
                    bg: pallete.dark.onTertiary,
                    title: 'on secondary',
                    textColor: pallete.dark.tertiary,
                }, {
                    bg: pallete.dark.tertiaryContainer,
                    title: 'tertiary container',
                    textColor: pallete.dark.onTertiaryContainer,
                }, {
                    bg: pallete.dark.onTertiaryContainer,
                    title: 'on tertiary container',
                    textColor: pallete.dark.tertiaryContainer,
                }],
                error: [{
                    bg: pallete.dark.error,
                    title: 'error',
                    textColor: pallete.dark.onError,
                }, {
                    bg: pallete.dark.onError,
                    title: 'on error',
                    textColor: pallete.dark.error,
                }, {
                    bg: pallete.dark.errorContainer,
                    title: 'error container',
                    textColor: pallete.dark.onErrorContainer,
                }, {
                    bg: pallete.dark.onErrorContainer,
                    title: 'on error container',
                    textColor: pallete.dark.errorContainer,
                }],
                background: [{
                    bg: pallete.dark.background,
                    title: 'background',
                    textColor: pallete.dark.onBackground,
                }, {
                    bg: pallete.dark.onBackground,
                    title: 'on background',
                    textColor: pallete.dark.background,
                }, {
                    bg: pallete.dark.surface,
                    title: 'surface',
                    textColor: pallete.dark.onSurface,
                }, {
                    bg: pallete.dark.onSurface,
                    title: 'on surface',
                    textColor: pallete.dark.surface,
                }],
                'surface-variant': [{
                    bg: pallete.dark.outline,
                    title: 'outline',
                    textColor: pallete.dark.surfaceVariant,
                }, {
                    bg: pallete.dark.surfaceVariant,
                    title: 'surface variant',
                    textColor: pallete.dark.onSurfaceVariant,
                }, {
                    bg: pallete.dark.onSurfaceVariant,
                    title: 'on surface variant',
                    textColor: pallete.dark.surfaceVariant,
                }],
            }
            this.light = light
            this.dark = dark
            const to = o => Object.entries(o).map(([k, v]) => {
                return {
                    text: k.replace('luminance', ''),
                    color: v
                }
            })
            this.more = {
                Primary: to(pallete.primary),
                Secondary: to(pallete.secondary),
                Tertiary: to(pallete.tertiary),
                Error: to(pallete.error),
                Neutral: to(pallete.neutral),
                ['Neutral Variant']: to(pallete.neutralVariant),
            }
        },
    }
}
</script>
<style scoped>
.header {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}
.image-preview {
    max-height: 200px;
}
.priview {
    flex: 8 1 0%;
    height: var(--content-height);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}
.priview-content {
    margin: auto;
    min-width: 586px;
    padding: 20px;
}
.preview-content > .headline2 {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 33px;
    letter-spacing: 0.18px;
    color: #1c1b1f;
    padding-bottom: 40px;
    padding-top: 44px;
}
.preview-content > .subtitle1 {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.18px;
    color: #1c1b1f;
}
.color-scheme {
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.color-scheme > .color-family:first-of-type {
    height: 118px;
}

.primary > .color-item:first-child {
    border-top-left-radius: 16px;
}
.primary > .color-item:last-child {
    border-top-right-radius: 16px;
}
.surface-variant > .color-item:last-child {
    border-bottom-right-radius: 16px;
}
.surface-variant > .color-item:first-child {
    border-bottom-left-radius: 16px;
}
.tonal-row {
    height: 72px;
}
.color-family,
.tonal-row {
    width: 100%;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 8px;
    margin-bottom: 8px;
    min-width: 585.05px;
    max-width: 585.05px;
}
.tonal-palettes .tonal-row {
    flex-direction: row-reverse;
}
.color-item {
    height: 100%;
    flex: 1 1 0%;
    position: relative;
}
.color-item > .color-label {
    position: absolute;
    left: 14px;
    top: 14px;
    overflow-wrap: break-word;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.002em;
    text-transform: capitalize;
}

.color-item {
    height: 100%;
    flex: 1 1 0%;
    position: relative;
}

.tonal-palettes {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tonal-row > .color-item {
    border: none;
}
.tonal-row > .color-item > .color-label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.color-item > .color-label {
    position: absolute;
    left: 14px;
    top: 14px;
    overflow-wrap: break-word;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.002em;
    text-transform: capitalize;
}
</style>