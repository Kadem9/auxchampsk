<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ViteAssetExtension extends AbstractExtension
{
    private bool $isDev;
    private string $manifest;
    private ?array $manifestData = null;

    public function __construct(bool $isDev, string $manifest)
    {
        $this->isDev = $isDev;
        $this->manifest = $manifest;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('vite_asset', [$this, 'viteAsset'], ['is_safe' => ['html']]),
        ];
    }

    public function viteAsset(string $entry): string
    {
        return $this->isDev ? $this->viteAssetDev($entry) : $this->viteAssetProd($entry);
    }

    private function viteAssetDev(string $entry): string
    {
        $html = <<<HTML
<script type="module" src="http://localhost:5173/assets/@vite/client"></script>
HTML;
        $html .= '<script type="module">
        import RefreshRuntime from "http://localhost:5173/assets/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
        </script>';
        $html .= <<<HTML
<script defer type="module" src="http://localhost:5173/assets/{$entry}"></script>
HTML;
        return $html;
    }

    private function viteAssetProd(string $entry): string
    {
        $manifestContent = file_get_contents($this->manifest);
        if ($this->manifestData === null && $manifestContent)
            $this->manifestData = json_decode($manifestContent, true);
        $file = $this->manifestData[$entry]['file'];
        $css = $this->manifestData[$entry]['css'] ?? [];
        $imports = $this->manifestData[$entry]['imports'] ?? [];
        $html = <<<HTML
<script defer type="module" src="/assets/{$file}"></script>
HTML;
        foreach ($css as $cssFile) {
            $html .= <<<HTML
        <link rel="stylesheet" href="/assets/{$cssFile}" />
        HTML;
        }
        foreach ($imports as $import) {
            $html .= <<<HTML
        <link rel="modulepreload" href="/assets/{$import}" />
        HTML;
        }
        return $html;
    }
}
