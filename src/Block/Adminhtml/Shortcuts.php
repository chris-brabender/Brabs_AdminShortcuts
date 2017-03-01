<?php

namespace Brabs\AdminShortcuts\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Store\Model\ScopeInterface;

/**
 * Class Shortcuts
 * @package Brabs\AdminShortcuts\Block\Adminhtml
 */
class Shortcuts extends Template
{

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    /**
     * Shortcuts constructor.
     * @param \Magento\Backend\Block\Context $context
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Backend\Block\Template\Context $context,
        array $data = []
    ) {
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context, $data);
    }

    /**
     * @return $this
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    protected function _beforeToHtml()
    {
        if ($this->isEnabled()) {
            $this->initJsLayout();
        } else {
            $this->setTemplate('');
        }

        return parent::_beforeToHtml();
    }

    /**
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    protected function initJsLayout()
    {

        /** @TODO - Make customisable shortcuts per user? */
        $data = [
            'components' => [
                'admin-shortcuts-container' => [ ]
            ]
        ];

        $jsLayout = array_merge_recursive($this->jsLayout, $data);
        $this->jsLayout = $jsLayout;
    }

    /**
     * @param string|null $websiteCode
     * @return bool
     */
    public function isEnabled($websiteCode = null)
    {
        return $this->scopeConfig->isSetFlag('brabs_adminshortcuts/general/enabled', ScopeInterface::SCOPE_WEBSITE, $websiteCode);
    }

}
